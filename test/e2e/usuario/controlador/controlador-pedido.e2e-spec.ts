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

/**
 * Un sandbox es util cuando el módulo de nest se configura una sola vez durante el ciclo completo de pruebas
 * */
const sinonSandbox = createSandbox();

describe('Pruebas al controlador de pedidos', () => {

  let app: INestApplication;
  let repositorioPedido: SinonStubbedInstance<RepositorioPedido>;
  let daoPedido: SinonStubbedInstance<DaoPedido>;

  /**
   * No Inyectar los módulos completos (Se trae TypeORM y genera lentitud al levantar la prueba, traer una por una las dependencias)
   **/
  beforeAll(async () => {
    repositorioPedido = createStubObj<RepositorioPedido>(['guardar'], sinonSandbox);
    daoPedido = createStubObj<DaoPedido>(['listar', 'cambiarPedido'], sinonSandbox);
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

  it('debería crear registar un pedido', async () => {
    const pedido: ComandoRegistrarPedido = {
      usuario: new Usuario('juan', '1234', new Date().toISOString()),
      producto: new Producto('Alitas Picantes', 40000, 'Las Alitas picantes son prácticas y fáciles de preparar, asadas o al horno.'),
      reunion: new Reunion('TIPO_GRANDE', 50000),
      fechaRealizacion: '2021-12-07T21:56:24.194Z',
      direccion: 'Carrera 80 # 70',
      valorTotal: 90000,  
    };

    return request(app.getHttpServer())
      .post('/pedidos').send(pedido)
      .expect(HttpStatus.CREATED);
  });
});
