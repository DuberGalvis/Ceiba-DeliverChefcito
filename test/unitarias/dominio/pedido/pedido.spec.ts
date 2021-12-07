import { Pedido } from 'src/dominio/pedido/modelo/pedido';

describe('Pedido', () => {

  const _Pedido = Pedido as any;

  it('producto con detalle mayor que 100 debería retornar error', () => {
    return expect(async () => new _Producto('Alitas Picantes', 40000, 'Las Alitas picantes son prácticas y fáciles de preparar, asadas o al horno. Son un producto adobado de sabor pronunciado.'))
      .rejects
      .toStrictEqual(new ErrorLongitudInvalida('El tamaño máximo del detalle debe ser 100'));
  });

  it('producto con detalle igual a 100 debería crear bien', () => {
    const producto = new _Producto('Alitas Picantes', 40000, 'Las Alitas picantes son prácticas y fáciles de preparar, asadas o al horno.');

    expect(producto.nombre).toEqual('Alitas Picantes');
    expect(producto.detalle).toEqual('Las Alitas picantes son prácticas y fáciles de preparar, asadas o al horno.');
  });
});