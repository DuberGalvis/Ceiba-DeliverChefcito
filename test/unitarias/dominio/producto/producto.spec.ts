import { Producto } from 'src/dominio/producto/modelo/producto';
import { ErrorLongitudInvalida } from 'src/dominio/errores/error-longitud-invalida';
import { ErrorValorRequerido } from 'src/dominio/errores/error-valor-requerido';

describe('Producto', () => {

  const _Producto = Producto as any;

  it('producto con detalle mayor que 100 debería retornar error', () => {
    return expect(async () => new _Producto('Alitas Picantes', 40000, 'Las Alitas picantes son prácticas y fáciles de preparar, asadas o al horno. Son un producto adobado de sabor pronunciado.'))
      .rejects
      .toStrictEqual(new ErrorLongitudInvalida('El tamaño máximo del detalle debe ser 100'));
  });

  it('producto con nombre vacio debería retornar error', () => {
    return expect(async () => new _Producto(undefined, 40000, 'Las Alitas picantes son prácticas y fáciles de preparar, asadas o al horno.'))
      .rejects
      .toStrictEqual(new ErrorValorRequerido('El nombre esta vacio, es requerido'));
  });

  it('producto con precio vacio debería retornar error', () => {
    return expect(async () => new _Producto('Alitas Picantes', undefined, 'Las Alitas picantes son prácticas y fáciles de preparar, asadas o al horno.'))
      .rejects
      .toStrictEqual(new ErrorValorRequerido('El precio esta vacio, es requerido'));
  });

  it('producto con validaciones ok se debería crear', () => {
    const producto = new _Producto('Alitas Picantes', 40000, 'Las Alitas picantes son prácticas y fáciles de preparar, asadas o al horno.');

    expect(producto.nombre).toEqual('Alitas Picantes');
    expect(producto.detalle).toEqual('Las Alitas picantes son prácticas y fáciles de preparar, asadas o al horno.');
  });
});
