import { Reunion } from 'src/dominio/reunion/modelo/reunion';
import { ErrorValorRequerido } from 'src/dominio/errores/error-valor-requerido';

describe('Reunion', () => {

  const _Reunion = Reunion as any;

  it('reunion con tipo diferente debería retornar error', () => {
    return expect(async () => new _Reunion('TIPO_MASGRANDE', 50000))
      .rejects
      .toStrictEqual(new ErrorValorRequerido('El tipo de reunion debe ser: TIPO_PEQUENA,TIPO_MEDIANA,TIPO_GRANDE.'));
  });

  it('reunion con tipo correcto debería crear bien', () => {
    const reunion = new _Reunion('TIPO_PEQUENA', 25000);

    expect(reunion.tipo).toEqual('TIPO_PEQUENA');
    expect(reunion.precio).toEqual(25000);
  });
});
