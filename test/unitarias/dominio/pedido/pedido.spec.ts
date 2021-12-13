import { ErrorHoraDeServicio } from 'src/dominio/errores/pedido/error-hora-de-servicio';
import { ErrorLunesNoFestivo } from 'src/dominio/errores/pedido/error-lunes-no-festivo';
import { ErrorNoHayDireccion } from 'src/dominio/errores/pedido/error-no-hay-direccion';
import { ErrorNoHayProducto } from 'src/dominio/errores/pedido/error-no-hay-producto';
import { ErrorNoHayReunion } from 'src/dominio/errores/pedido/error-no-hay-reunion';
import { ErrorNoHayUsuario } from 'src/dominio/errores/pedido/error-no-hay-usuario';
import { ErrorNoHayValortotal } from 'src/dominio/errores/pedido/error-no-hay-valortotal';
import { Pedido } from 'src/dominio/pedido/modelo/pedido';
import { Producto } from 'src/dominio/producto/modelo/producto';
import { Reunion } from 'src/dominio/reunion/modelo/reunion';
import { Usuario } from 'src/dominio/usuario/modelo/usuario';

describe('Pedido', () => {

  const _Pedido = Pedido as any;
  const _Usuario = Usuario as any;
  const _Producto = Producto as any;
  const _Reunion = Reunion as any;  

  it('Pedido con fecha de lunes debería retornar error', () => {
    return expect(async () => new _Pedido( new _Usuario('juan', '1234', new Date().toISOString()),
      new _Producto('Alitas Picantes', 40000, 'Las Alitas picantes son prácticas y fáciles de preparar, asadas o al horno.'),
      new _Reunion('TIPO_GRANDE', 50000), 
      '2021-12-06',
      'Carrera 80 # 70',
      250000,
      5))
      .rejects
      .toStrictEqual(new ErrorLunesNoFestivo('No se puede agendar pedido para este día'));
  });

  it('Pedido con horario que pasa el maximo de horas debería retornar error', () => {
    return expect(async () => new _Pedido( new _Usuario('juan', '1234', new Date().toISOString()),
      new _Producto('Alitas Picantes', 40000, 'Las Alitas picantes son prácticas y fáciles de preparar, asadas o al horno.'),
      new _Reunion('TIPO_GRANDE', 50000), 
      '2021-12-05',
      'Carrera 80 # 70',
      250000,
      9))
      .rejects
      .toStrictEqual(new ErrorHoraDeServicio('No se puede sobrepasar las 8 horas o ser menos a 4 horas'));
  });

  it('Pedido sin usuario deberia retornar error', () => {
    return expect(async () => new _Pedido( undefined,
      new _Producto('Alitas Picantes', 40000, 'Las Alitas picantes son prácticas y fáciles de preparar, asadas o al horno.'),
      new _Reunion('TIPO_GRANDE', 50000), 
      '2021-12-06',
      'Carrera 80 # 70',
      250000,
      5))
      .rejects
      .toStrictEqual(new ErrorNoHayUsuario('El usuario esta vacio, es requerido'));
  });

  it('Pedido sin producto deberia retornar error', () => {
    return expect(async () => new _Pedido( new _Usuario('juan', '1234', new Date().toISOString()),
      undefined,
      new _Reunion('TIPO_GRANDE', 50000), 
      '2021-12-06',
      'Carrera 80 # 70',
      250000,
      5))
      .rejects
      .toStrictEqual(new ErrorNoHayProducto('El Producto esta vacio, es requerido'));
  });

  it('Pedido sin reunion deberia retornar error', () => {
    return expect(async () => new _Pedido( new _Usuario('juan', '1234', new Date().toISOString()),
      new _Producto('Alitas Picantes', 40000, 'Las Alitas picantes son prácticas y fáciles de preparar, asadas o al horno.'),
      undefined, 
      '2021-12-06',
      'Carrera 80 # 70',
      250000,
      5))
      .rejects
      .toStrictEqual(new ErrorNoHayReunion('La Reunion esta vacia, es requerido'));
  });

  it('Pedido sin direccion deberia retornar error', () => {
    return expect(async () => new _Pedido( new _Usuario('juan', '1234', new Date().toISOString()),
      new _Producto('Alitas Picantes', 40000, 'Las Alitas picantes son prácticas y fáciles de preparar, asadas o al horno.'),
      new _Reunion('TIPO_GRANDE', 50000), 
      '2021-12-06',
      undefined,
      250000,
      5))
      .rejects
      .toStrictEqual(new ErrorNoHayDireccion('La direccion esta vacia, es requerido'));
  });

  it('Pedido sin valor total deberia retornar error', () => {
    return expect(async () => new _Pedido( new _Usuario('juan', '1234', new Date().toISOString()),
      new _Producto('Alitas Picantes', 40000, 'Las Alitas picantes son prácticas y fáciles de preparar, asadas o al horno.'),
      new _Reunion('TIPO_GRANDE', 50000), 
      '2021-12-06',
      'Carrera 80 # 70',
      undefined,
      5))
      .rejects
      .toStrictEqual(new ErrorNoHayValortotal('El valor total esta vacio, es requerido'));
  });

  it('producto con todas las validaciones ok debería crear bien', () => {
    const pedido = new _Pedido( new _Usuario('juan', '1234', new Date().toISOString()),
    new _Producto('Alitas Picantes', 40000, 'Las Alitas picantes son prácticas y fáciles de preparar, asadas o al horno.'),
    new _Reunion('TIPO_GRANDE', 50000), 
    '2021-12-05',
    'Carrera 80 # 70',
    250000,
    4);

    expect(pedido.direccion).toEqual('Carrera 80 # 70');
    expect(pedido.estado).toEqual('ESTADO_ACTIVO');
  });
});
