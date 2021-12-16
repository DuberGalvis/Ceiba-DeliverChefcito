import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { FiltroExcepcionesDeNegocio } from 'src/infraestructura/excepciones/filtro-excepciones-negocio';
import { AppLogger } from 'src/infraestructura/configuracion/ceiba-logger.service';
import { createSandbox, SinonStubbedInstance } from 'sinon';
import { createStubObj } from '../../../util/create-object.stub';
import { RepositorioReunion } from 'src/dominio/reunion/puerto/repositorio/repositorio-reunion';
import { DaoReunion } from 'src/dominio/reunion/puerto/dao/dao-reunion';
import { ReunionControlador } from 'src/infraestructura/reunion/controlador/reunion.controlador';
import { ServicioRegistrarReunion } from 'src/dominio/reunion/servicio/servicio-registrar-reunion';
import { servicioRegistrarReunionProveedor } from 'src/infraestructura/reunion/proveedor/servicio/servicio-registrar-reunion.proveedor';
import { ManejadorRegistrarReunion } from 'src/aplicacion/reunion/comando/registrar-reunion.manejador';
import { ManejadorConsultarReunion } from 'src/aplicacion/reunion/consulta/consulta-reunion.manejador';
import { ComandoRegistrarReunion } from 'src/aplicacion/reunion/comando/registrar-reunion.comando';
import { ManejadorlistarReuniones } from 'src/aplicacion/reunion/consulta/listar-reunion-manejador';

/**
 * Un sandbox es util cuando el módulo de nest se configura una sola vez durante el ciclo completo de pruebas
 * */
const sinonSandbox = createSandbox();

describe('Pruebas al controlador de reuniones', () => {

  let app: INestApplication;
  let repositorioReunion: SinonStubbedInstance<RepositorioReunion>;
  let daoReunion: SinonStubbedInstance<DaoReunion>;

  /**
   * No Inyectar los módulos completos (Se trae TypeORM y genera lentitud al levantar la prueba, traer una por una las dependencias)
   **/
  beforeAll(async () => {
    repositorioReunion = createStubObj<RepositorioReunion>(['existeTipoReunion', 'guardar'], sinonSandbox);
    daoReunion = createStubObj<DaoReunion>(['consultar', 'listarReuniones'], sinonSandbox);
    const moduleRef = await Test.createTestingModule({
      controllers: [ReunionControlador],
      providers: [
        AppLogger,
        {
          provide: ServicioRegistrarReunion,
          inject: [RepositorioReunion],
          useFactory: servicioRegistrarReunionProveedor,
        },
        { provide: RepositorioReunion, useValue: repositorioReunion },
        { provide: DaoReunion, useValue: daoReunion },
        ManejadorRegistrarReunion,
        ManejadorConsultarReunion,
        ManejadorlistarReuniones,
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

  it('deberia consultar la reunion registrada', () => {

    const reunion: any = [{ tipo: 'TIPO_PEQUENA', precio: 40000 }];
    const tipo: any = 'TIPO_PEQUENA';
    daoReunion.consultar.returns(Promise.resolve(reunion));

    return request(app.getHttpServer())
      .get(`/reuniones/${tipo}`)
      .expect(HttpStatus.OK)
      .expect(reunion);
  });

  it('deberia listar las reuniones registradas', () => {

    let listaReuniones: any = [{ tipo: 'TIPO_PEQUENA', precio: 40000 },
    { tipo: 'TIPO_GRANDE', precio: 50000 }];
    daoReunion.listarReuniones.returns(Promise.resolve(listaReuniones));

    return request(app.getHttpServer())
      .get(`/reuniones`)
      .expect(HttpStatus.OK)
      .expect(listaReuniones);
  });

  it('deberia fallar al registar una reunion con tipo incorrecto', async () => {
    const reunion: ComandoRegistrarReunion = {
      tipo: 'TIPO_MUY_PEQUENA',
      precio: 40000,
    };
    const mensaje = 'El tipo de reunion debe ser: TIPO_PEQUENA,TIPO_MEDIANA,TIPO_GRANDE.';

    const response = await request(app.getHttpServer())
      .post('/reuniones').send(reunion)
      .expect(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toBe(mensaje);
    expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });
});
