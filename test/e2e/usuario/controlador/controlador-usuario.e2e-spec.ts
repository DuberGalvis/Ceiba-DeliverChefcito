import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { RepositorioUsuario } from 'src/dominio/usuario/puerto/repositorio/repositorio-usuario';
import { DaoUsuario } from 'src/dominio/usuario/puerto/dao/dao-usuario';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { FiltroExcepcionesDeNegocio } from 'src/infraestructura/excepciones/filtro-excepciones-negocio';
import { UsuarioControlador } from 'src/infraestructura/usuario/controlador/usuario.controlador';
import { ServicioRegistrarUsuario } from 'src/dominio/usuario/servicio/servicio-registrar-usuario';
import { servicioRegistrarUsuarioProveedor } from 'src/infraestructura/usuario/proveedor/servicio/servicio-registrar-usuario.proveedor';
import { ManejadorRegistrarUsuario } from 'src/aplicacion/usuario/comando/registar-usuario.manejador';
import { ManejadorListarUsuario } from 'src/aplicacion/usuario/consulta/listar-usuarios.manejador';
import { ComandoRegistrarUsuario } from 'src/aplicacion/usuario/comando/registrar-usuario.comando';
import { AppLogger } from 'src/infraestructura/configuracion/ceiba-logger.service';
import { createSandbox, SinonStubbedInstance } from 'sinon';
import { createStubObj } from '../../../util/create-object.stub';
import { ManejadorConsultarUsuario } from 'src/aplicacion/usuario/consulta/consultar-usuario.manejador';
import { ManejadorCambiarUsuario } from 'src/aplicacion/usuario/cambio/cambiar-usuario.manejador';

/**
 * Un sandbox es util cuando el módulo de nest se configura una sola vez durante el ciclo completo de pruebas
 * */
const sinonSandbox = createSandbox();

describe('Pruebas al controlador de usuarios', () => {

  let app: INestApplication;
  let repositorioUsuario: SinonStubbedInstance<RepositorioUsuario>;
  let daoUsuario: SinonStubbedInstance<DaoUsuario>;

  /**
   * No Inyectar los módulos completos (Se trae TypeORM y genera lentitud al levantar la prueba, traer una por una las dependencias)
   **/
  beforeAll(async () => {
    repositorioUsuario = createStubObj<RepositorioUsuario>(['existeNombreUsuario', 'guardar'], sinonSandbox);
    daoUsuario = createStubObj<DaoUsuario>(['listar', 'consultar', 'cambiar'], sinonSandbox);
    const moduleRef = await Test.createTestingModule({
      controllers: [UsuarioControlador],
      providers: [
        AppLogger,
        {
          provide: ServicioRegistrarUsuario,
          inject: [RepositorioUsuario],
          useFactory: servicioRegistrarUsuarioProveedor,
        },
        { provide: RepositorioUsuario, useValue: repositorioUsuario },
        { provide: DaoUsuario, useValue: daoUsuario },
        ManejadorRegistrarUsuario,
        ManejadorListarUsuario,
        ManejadorConsultarUsuario,
        ManejadorCambiarUsuario,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    const logger = await app.resolve(AppLogger);
    logger.customError = sinonSandbox.stub();
    app.useGlobalFilters(new FiltroExcepcionesDeNegocio(logger));
    await app.init();
  });

  afterEach(() => {
    sinonSandbox.restore();
  });

  afterAll(async () => {
    await app.close();
  });

  it('debería consultar el usuario registrado', () => {

    const usuario: any = [{ nombre: 'Lorem ipsum', clave: '1234' }];
    daoUsuario.consultar.returns(Promise.resolve(usuario));

    return request(app.getHttpServer())
      .get('/usuarios')
      .expect(HttpStatus.OK)
      .expect(usuario);
  });

  it('debería cambiar la clave del usuario registrado', () => {

    const usuario: any = [{ nombre: 'Lorem ipsum', claveActual: '1234', claveNueva: '4321' }];
    daoUsuario.cambiar.returns(Promise.resolve(usuario));

    return request(app.getHttpServer())
      .patch('/usuarios')
      .expect(HttpStatus.OK);
  });

  it('debería fallar al registar un usuario clave muy corta', async () => {
    const usuario: ComandoRegistrarUsuario = {
      nombre: 'Lorem ipsum',
      fechaCreacion: (new Date()).toISOString(),
      clave: '123',
    };
    const mensaje = 'El tamaño mínimo de la clave debe ser 4';

    const response = await request(app.getHttpServer())
      .post('/usuarios').send(usuario)
      .expect(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toBe(mensaje);
    expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });

  it('debería fallar al registar un usuario ya existente', async () => {
    const usuario: ComandoRegistrarUsuario = {
      nombre: 'Lorem ipsum',
      fechaCreacion: (new Date()).toISOString(),
      clave: '1234',
    };
    const mensaje = `El nombre de usuario ${usuario.nombre} ya existe`;
    repositorioUsuario.existeNombreUsuario.returns(Promise.resolve(true));

    const response = await request(app.getHttpServer())
      .post('/usuarios').send(usuario)
      .expect(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toBe(mensaje);
    expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });

  it('debería crear el registro del usuario', async () => {
    const usuario: ComandoRegistrarUsuario = {
      nombre: 'Lorem ipsum',
      fechaCreacion: (new Date()).toISOString(),
      clave: '1234',
    };
    repositorioUsuario.existeNombreUsuario.returns(Promise.resolve(false));

    return request(app.getHttpServer())
      .post('/usuarios').send(usuario)
      .expect(HttpStatus.CREATED);
  });
});
