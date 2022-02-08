import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { FiltroExcepcionesDeNegocio } from 'src/infraestructura/excepciones/filtro-excepciones-negocio';
import { AppLogger } from 'src/infraestructura/configuracion/ceiba-logger.service';
import { createSandbox, SinonStubbedInstance } from 'sinon';
import { createStubObj } from '../../../util/create-object.stub';
import { RepositorioPedido } from 'src/dominio/pedido/puerto/repositorio/repositorio-pedido';
import { DaoPedido } from 'src/dominio/pedido/puerto/dao/dao-pedido';
import { PedidoControlador } from 'src/infraestructura/pedido/controlador/pedido.controlador';
import { ServicioRegistrarPedido } from 'src/dominio/pedido/servicio/servicio-registrar-pedido';
import { servicioRegistrarPedidoProveedor } from 'src/infraestructura/pedido/proveedor/servicio/servicio-registrar-pedido.proveedor';
import { ManejadorRegistrarPedido } from 'src/aplicacion/pedido/comando/registrar-pedido.manejador';
import { ManejadorCambiarPedido } from 'src/aplicacion/pedido/cambio/cambiar-pedido.manejador';
import { ManejadorListarPedido } from 'src/aplicacion/pedido/consulta/listar-pedido.manejador';
import { ComandoRegistrarPedido } from 'src/aplicacion/pedido/comando/registrar-pedido.comando';
import { Usuario } from 'src/dominio/usuario/modelo/usuario';
import { Producto } from 'src/dominio/producto/modelo/producto';
import { Reunion } from 'src/dominio/reunion/modelo/reunion';
import { ManejadorCancelarPedido } from 'src/aplicacion/pedido/cambio/cancelar-pedido.manejador';
import { ComandoCambiarPedido } from 'src/aplicacion/pedido/cambio/cambiar-pedido.comando';
import { ComandoCancelarPedido } from 'src/aplicacion/pedido/cambio/cancelar-pedido.comando';

/**
 * Un sandbox es util cuando el módulo de nest se configura una sola vez durante el ciclo completo de pruebas
 * */
const sinonSandbox = createSandbox();

describe('Pruebas al controlador de pedidos', () => {

  let app: INestApplication;
  let repositorioPedido: SinonStubbedInstance<RepositorioPedido>;
  let daoPedido: SinonStubbedInstance<DaoPedido>;
  let fechaPedido = new Date();

  /**
   * No Inyectar los módulos completos (Se trae TypeORM y genera lentitud al levantar la prueba, traer una por una las dependencias)
   **/
  beforeAll(async () => {
    fechaPedido = new Date(); 
    fechaPedido.setDate(fechaPedido.getDate() + 1);

    if(fechaPedido.getDay() === 1){
      fechaPedido.setDate(fechaPedido.getDate() + 1);
    }

    repositorioPedido = createStubObj<RepositorioPedido>(['guardar'], sinonSandbox);
    daoPedido = createStubObj<DaoPedido>(['listar', 'cambiarPedido', 'cancelarPedido'], sinonSandbox);
    const moduleRef = await Test.createTestingModule({
      controllers: [PedidoControlador],
      providers: [
        AppLogger,
        {
          provide: ServicioRegistrarPedido,
          inject: [RepositorioPedido],
          useFactory: servicioRegistrarPedidoProveedor,
        },
        { provide: RepositorioPedido, useValue: repositorioPedido },
        { provide: DaoPedido, useValue: daoPedido },
        ManejadorRegistrarPedido,
        ManejadorCambiarPedido,
        ManejadorListarPedido,
        ManejadorCancelarPedido,
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

  it('debería listar el pedido registrado', () => {

    const pedido: any = [{ nombre: 'juan' }];
    daoPedido.listar.returns(Promise.resolve(pedido));

    return request(app.getHttpServer())
      .get('/pedidos')
      .expect(HttpStatus.OK)
      .expect(pedido);
  });

  it('debería generar error a la creacion del pedido por error del API', async () => {
    const crearPedido: ComandoRegistrarPedido = {
      usuario: new Usuario('juan', '1234', new Date().toISOString()),
      producto: new Producto('Alitas Picantes', 40000, 'Las Alitas picantes son prácticas y fáciles de preparar, asadas o al horno.', 'imagen.png'),
      reunion: new Reunion('TIPO_GRANDE', 50000),
      fechaRealizacion: fechaPedido.toISOString(),
      direccion: 'Carrera 80 # 70',
      valorTotal: 90000,
      horasDeServicio: 7,  
    };

    return request(app.getHttpServer())
      .post('/pedidos').send(crearPedido)
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  it('debería cambiar un pedido', async () => {
    const cambiarPedido: ComandoCambiarPedido = {
      id: 23,
      usuario: new Usuario('juan', '1234', new Date().toISOString()),
      producto: new Producto('Alitas Picantes', 40000, 'Las Alitas picantes son prácticas y fáciles de preparar, asadas o al horno.', 'imagen.png'),
      reunion: new Reunion('TIPO_GRANDE', 50000),
      fechaRealizacion: fechaPedido.toISOString(),
      direccion: 'Carrera 80 # 70',
      valorTotal: 90000,
      horasDeServicio: 7,  
    };

    return request(app.getHttpServer())
      .patch('/pedidos').send(cambiarPedido)
      .expect(HttpStatus.OK);
  });

  it('debería cancelar el pedido registrado', () => {

    const cancelarPedido: ComandoCancelarPedido = {
      id: 23,  
    };

    return request(app.getHttpServer())
      .patch('/pedidos/cancelar').send(cancelarPedido)
      .expect(HttpStatus.OK);
  });

  it('debería no cancelar el pedido registrado', () => {

    const noCancelaPedido: ComandoCancelarPedido = {
      id: 20,  
    };

    return request(app.getHttpServer())
      .patch('/pedidos/cancelar').send(noCancelaPedido)
      .expect(HttpStatus.OK);
  });
});
