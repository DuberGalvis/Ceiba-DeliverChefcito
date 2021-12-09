import { ErrorDeNegocio } from 'src/dominio/errores/error-de-negocio';
import { ESTADO, Pedido } from 'src/dominio/pedido/modelo/pedido';
import { Producto } from 'src/dominio/producto/modelo/producto';
import { Reunion } from 'src/dominio/reunion/modelo/reunion';
import { Usuario } from 'src/dominio/usuario/modelo/usuario';

describe('Pedido', () => {

  const _Pedido = Pedido as any;
  const _Usuario = Usuario as any;
  const _Producto = Producto as any;
  const _Reunion = Reunion as any;  

  it('Pedido con fecha de lunes o festivo debería retornar error', () => {
    return expect(async () => new _Pedido( new _Usuario('juan', '1234', new Date().toISOString()),
      new _Producto('Alitas Picantes', 40000, 'Las Alitas picantes son prácticas y fáciles de preparar, asadas o al horno.'),
      new _Reunion('TIPO_GRANDE', 50000), 
      '2021-12-06',
      ESTADO.ESTADO_ACTIVO,
      'Carrera 80 # 70',
      250000))
      .rejects
      .toStrictEqual(new ErrorDeNegocio('No se puede agendar pedido para este día'));
  });

  it('producto con dia diferente a lunes debería crear bien', () => {
    const pedido = new _Pedido( new _Usuario('juan', '1234', new Date().toISOString()),
    new _Producto('Alitas Picantes', 40000, 'Las Alitas picantes son prácticas y fáciles de preparar, asadas o al horno.'),
    new _Reunion('TIPO_GRANDE', 50000), 
    '2021-12-05',
    ESTADO.ESTADO_ACTIVO,
    'Carrera 80 # 70',
    250000);

    expect(pedido.direccion).toEqual('Carrera 80 # 70');
    expect(pedido.estado).toEqual(ESTADO.ESTADO_ACTIVO);
  });
});