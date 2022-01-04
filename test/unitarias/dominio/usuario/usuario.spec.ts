import { Usuario } from 'src/dominio/usuario/modelo/usuario';
import { ErrorLongitudInvalida } from 'src/dominio/errores/error-longitud-invalida';
import { ErrorValorRequerido } from 'src/dominio/errores/error-valor-requerido';

describe('Usuario', () => {

  const _Usuario = Usuario as any;

  it('usuario con clave menor que 4 debería retornar error', () => {
    return expect(async () => new _Usuario('juan', '12', new Date().toISOString()))
      .rejects
      .toStrictEqual(new ErrorLongitudInvalida('El tamaño mínimo de la clave debe ser 4'));
  });

  it('usuario sin fecha de creacion deberia retornar error', () => {
    return expect(async () => new _Usuario('juan', '1234', ''))
      .rejects
      .toStrictEqual(new ErrorValorRequerido('El valor de la fecha de creación es requerido'));
  });

  it('usuario con clave igual a 4 y valor fecha debería crear bien', () => {
    const usuario = new _Usuario('juan', '4123', new Date().toISOString());

    expect(usuario.nombre).toEqual('juan');
    expect(usuario.clave).toEqual('4123');
    expect(usuario.fechaCreacion.toLocaleString('es-CO', { hour12: true})).toEqual(new Date().toLocaleString('es-CO', { hour12: true}));
  });
});
