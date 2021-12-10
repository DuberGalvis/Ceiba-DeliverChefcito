import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { FiltroExcepcionesDeNegocio } from 'src/infraestructura/excepciones/filtro-excepciones-negocio';
import { AppLogger } from 'src/infraestructura/configuracion/ceiba-logger.service';
import { createSandbox, SinonStubbedInstance } from 'sinon';
import { createStubObj } from '../../../util/create-object.stub';
import { RepositorioProducto } from 'src/dominio/producto/puerto/repositorio/repositorio-producto';
import { DaoProducto } from 'src/dominio/producto/puerto/dao/dao-producto';
import { ProductoControlador } from 'src/infraestructura/producto/controlador/producto.controlador';
import { servicioRegistrarProductoProveedor } from 'src/infraestructura/producto/proveedor/servicio/servicio-registrar-producto.proveedor';
import { ManejadorRegistrarProducto } from 'src/aplicacion/producto/comando/registrar-producto.manejador';
import { ManejadorConsultarProducto } from 'src/aplicacion/producto/consulta/consultar-producto.manejador';
import { ServicioRegistrarProducto } from 'src/dominio/producto/servicio/servicio-registrar-producto';
import { ComandoRegistrarProducto } from 'src/aplicacion/producto/comando/registrar-producto.comando';
import { ManejadorListarProducto } from 'src/aplicacion/producto/consulta/listar-producto.manejador';

/**
 * Un sandbox es util cuando el módulo de nest se configura una sola vez durante el ciclo completo de pruebas
 * */
const sinonSandbox = createSandbox();

describe('Pruebas al controlador de productos', () => {

  let app: INestApplication;
  let repositorioProducto: SinonStubbedInstance<RepositorioProducto>;
  let daoProducto: SinonStubbedInstance<DaoProducto>;

  /**
   * No Inyectar los módulos completos (Se trae TypeORM y genera lentitud al levantar la prueba, traer una por una las dependencias)
   **/
  beforeAll(async () => {
    repositorioProducto = createStubObj<RepositorioProducto>(['existeNombreProducto', 'guardar'], sinonSandbox);
    daoProducto = createStubObj<DaoProducto>(['listar', 'consultar'], sinonSandbox);
    const moduleRef = await Test.createTestingModule({
      controllers: [ProductoControlador],
      providers: [
        AppLogger,
        {
          provide: ServicioRegistrarProducto,
          inject: [RepositorioProducto],
          useFactory: servicioRegistrarProductoProveedor,
        },
        { provide: RepositorioProducto, useValue: repositorioProducto },
        { provide: DaoProducto, useValue: daoProducto },
        ManejadorRegistrarProducto,
        ManejadorConsultarProducto,
        ManejadorListarProducto,
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

  it('debería consultar el producto registrado', () => {

    const producto: any = [{ nombre: 'Alitas Picantes', precio: 40000, detalle: 'Las Alitas picantes son prácticas y fáciles de preparar, asadas o al horno.' }];
    daoProducto.consultar.returns(Promise.resolve(producto));

    return request(app.getHttpServer())
      .get('/productos')
      .expect(HttpStatus.OK)
      .expect(producto);
  });

  it('debería fallar al registar un producto con detalle muy largo', async () => {
    const producto: ComandoRegistrarProducto = {
      nombre: 'Alitas Picantes',
      precio: 40000,
      detalle: 'Las Alitas picantes son prácticas y fáciles de preparar, asadas o al horno. Son un producto adobado de sabor pronunciado.',
    };
    const mensaje = 'El tamaño máximo del detalle debe ser 100';

    const response = await request(app.getHttpServer())
      .post('/productos').send(producto)
      .expect(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toBe(mensaje);
    expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });

  it('debería fallar al registar un producto ya existente', async () => {
    const producto: ComandoRegistrarProducto = {
      nombre: 'Alitas Picantes',
      precio: 40000,
      detalle: 'Las Alitas picantes son prácticas y fáciles de preparar, asadas o al horno.',
    };
    const mensaje = `El nombre del producto ${producto.nombre} ya existe`;
    repositorioProducto.existeNombreProducto.returns(Promise.resolve(true));

    const response = await request(app.getHttpServer())
      .post('/productos').send(producto)
      .expect(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toBe(mensaje);
    expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });
});
