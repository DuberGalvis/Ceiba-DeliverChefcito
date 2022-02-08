import { ErrorValorRequerido } from 'src/dominio/errores/error-valor-requerido';
import { ErrorFechaNoValida } from 'src/dominio/errores/pedido/error-fecha-no-valida';
import { ErrorHoraDeServicio } from 'src/dominio/errores/pedido/error-hora-de-servicio';
import { ErrorLunesNoFestivo } from 'src/dominio/errores/pedido/error-lunes-no-festivo';
import { ErrorNoHayProducto } from 'src/dominio/errores/pedido/error-no-hay-producto';
import { ErrorNoHayReunion } from 'src/dominio/errores/pedido/error-no-hay-reunion';
import { ErrorNoHayUsuario } from 'src/dominio/errores/pedido/error-no-hay-usuario';
import { Pedido } from 'src/dominio/pedido/modelo/pedido';
import { Producto } from 'src/dominio/producto/modelo/producto';
import { Reunion } from 'src/dominio/reunion/modelo/reunion';
import { Usuario } from 'src/dominio/usuario/modelo/usuario';

describe('Pedido', () => {
  
  const LUNES = 1;
  const _Pedido = Pedido as any;
  const _Usuario = Usuario as any;
  const _Producto = Producto as any;
  const _Reunion = Reunion as any;
  let fechaPedido = new Date(); 
  
  beforeEach(() => {
    fechaPedido = new Date(); 
    fechaPedido.setDate(fechaPedido.getDate() + 1);

    if(fechaPedido.getDay() === LUNES){
      fechaPedido.setDate(fechaPedido.getDate() + 1);
    }
  });

  it('Pedido con fecha de lunes debería retornar error', () => {
    const DIA8 = 8;
    const DIA = fechaPedido.getDay();
    fechaPedido.setDate(fechaPedido.getDate() + (DIA8 - DIA));
    return expect(async () => new _Pedido( new _Usuario('juan', '1234', new Date().toISOString()),
      new _Producto('Alitas Picantes', 40000, 'Las Alitas picantes son prácticas y fáciles de preparar, asadas o al horno.', '../../imagenes'),
      new _Reunion('TIPO_GRANDE', 50000), 
      fechaPedido.toISOString(),
      'Carrera 80 # 70',
      250000,
      5))
      .rejects
      .toStrictEqual(new ErrorLunesNoFestivo('No se puede agendar pedido para los Lunes'));
  });

  it('Pedido con horario que pasa el maximo de horas debería retornar error', () => {
    return expect(async () => new _Pedido( new _Usuario('juan', '1234', new Date().toISOString()),
      new _Producto('Alitas Picantes', 40000, 'Las Alitas picantes son prácticas y fáciles de preparar, asadas o al horno.', '../../imagenes'),
      new _Reunion('TIPO_GRANDE', 50000), 
      fechaPedido.toISOString(),
      'Carrera 80 # 70',
      250000,
      9))
      .rejects
      .toStrictEqual(new ErrorHoraDeServicio('No se puede sobrepasar las 8 horas o ser menos a 4 horas'));
  });

  it('Pedido sin usuario deberia retornar error', () => {
    return expect(async () => new _Pedido( undefined,
      new _Producto('Alitas Picantes', 40000, 'Las Alitas picantes son prácticas y fáciles de preparar, asadas o al horno.', '../../imagenes'),
      new _Reunion('TIPO_GRANDE', 50000), 
      fechaPedido.toISOString(),
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
      fechaPedido.toISOString(),
      'Carrera 80 # 70',
      250000,
      5))
      .rejects
      .toStrictEqual(new ErrorNoHayProducto('El Producto esta vacio, es requerido'));
  });

  it('Pedido sin reunion deberia retornar error', () => {
    return expect(async () => new _Pedido( new _Usuario('juan', '1234', new Date().toISOString()),
      new _Producto('Alitas Picantes', 40000, 'Las Alitas picantes son prácticas y fáciles de preparar, asadas o al horno.', '../../imagenes'),
      undefined, 
      fechaPedido.toISOString(),
      'Carrera 80 # 70',
      250000,
      5))
      .rejects
      .toStrictEqual(new ErrorNoHayReunion('La Reunion esta vacia, es requerido'));
  });

  it('Pedido sin direccion deberia retornar error', () => {
    return expect(async () => new _Pedido( new _Usuario('juan', '1234', new Date().toISOString()),
      new _Producto('Alitas Picantes', 40000, 'Las Alitas picantes son prácticas y fáciles de preparar, asadas o al horno.', '../../imagenes'),
      new _Reunion('TIPO_GRANDE', 50000), 
      fechaPedido.toISOString(),
      undefined,
      250000,
      5))
      .rejects
      .toStrictEqual(new ErrorValorRequerido('El campo Dirección esta vacio, es requerido'));
  });

  it('Pedido sin valor total deberia retornar error', () => {
    return expect(async () => new _Pedido( new _Usuario('juan', '1234', new Date().toISOString()),
      new _Producto('Alitas Picantes', 40000, 'Las Alitas picantes son prácticas y fáciles de preparar, asadas o al horno.', '../../imagenes'),
      new _Reunion('TIPO_GRANDE', 50000), 
      fechaPedido.toISOString(),
      'Carrera 80 # 70',
      undefined,
      5))
      .rejects
      .toStrictEqual(new ErrorValorRequerido('El campo Valor Total esta vacio, es requerido'));
  });

  it('Pedido sin horas de servicio deberia retornar error', () => {
    return expect(async () => new _Pedido( new _Usuario('juan', '1234', new Date().toISOString()),
      new _Producto('Alitas Picantes', 40000, 'Las Alitas picantes son prácticas y fáciles de preparar, asadas o al horno.', '../../imagenes'),
      new _Reunion('TIPO_GRANDE', 50000), 
      fechaPedido.toISOString(),
      'Carrera 80 # 70',
      250000,
      undefined))
      .rejects
      .toStrictEqual(new ErrorValorRequerido('El campo Horas de Servicio esta vacio, es requerido'));
  });

  it('Pedido sin fecha de realizacion deberia retornar error', () => {
    return expect(async () => new _Pedido( new _Usuario('juan', '1234', new Date().toISOString()),
      new _Producto('Alitas Picantes', 40000, 'Las Alitas picantes son prácticas y fáciles de preparar, asadas o al horno.', '../../imagenes'),
      new _Reunion('TIPO_GRANDE', 50000),
      undefined, 
      'Carrera 80 # 70',
      90000,
      5))
      .rejects
      .toStrictEqual(new ErrorValorRequerido('El campo Fecha Realización esta vacio, es requerido'));
  });

  it('Pedido con fecha actual o menor deberia retornar error', () => {
    return expect(async () => new _Pedido( new _Usuario('juan', '1234', new Date().toISOString()),
      new _Producto('Alitas Picantes', 40000, 'Las Alitas picantes son prácticas y fáciles de preparar, asadas o al horno.', '../../imagenes'),
      new _Reunion('TIPO_GRANDE', 50000),
      new Date().toISOString(), 
      'Carrera 80 # 70',
      90000,
      5))
      .rejects
      .toStrictEqual(new ErrorFechaNoValida('La fecha del pedido debe ser mayor a la fecha actual'));
  });

  it('producto con todas las validaciones ok debería crear bien', () => {
    const pedido = new _Pedido( new _Usuario('juan', '1234', new Date().toISOString()),
    new _Producto('Alitas Picantes', 40000, 'Las Alitas picantes son prácticas y fáciles de preparar, asadas o al horno.', '../../imagenes'),
    new _Reunion('TIPO_GRANDE', 50000), 
    fechaPedido.toISOString(),
    'Carrera 80 # 70',
    250000,
    4);

    expect(pedido.usuario).toEqual(new Usuario('juan', '1234', new Date().toISOString()));
    expect(pedido.producto).toEqual(new Producto('Alitas Picantes', 40000, 'Las Alitas picantes son prácticas y fáciles de preparar, asadas o al horno.', '../../imagenes'));
    expect(pedido.reunion).toEqual(new Reunion( 'TIPO_GRANDE', 50000));
    expect(pedido.fechaRealizacion.toISOString()).toEqual(fechaPedido.toISOString());
    expect(pedido.direccion).toEqual('Carrera 80 # 70');
    expect(pedido.estado).toEqual('ESTADO_ACTIVO');
    expect(pedido.valorTotal).toEqual(250000);
    expect(pedido.horasDeServicio).toEqual(4);
  });
});
