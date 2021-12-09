import { Reunion } from 'src/dominio/reunion/modelo/reunion';
import { ErrorDeNegocio } from 'src/dominio/errores/error-de-negocio';

describe('Reunion', () => {

  const _Reunion = Reunion as any;

  it('reunion con tipo diferente debería retornar error', () => {
    return expect(async () => new _Reunion('TIPO_MASGRANDE', 50000))
      .rejects
      .toStrictEqual(new ErrorDeNegocio('El tipo de reunion debe ser: TIPO_PEQUENA,TIPO_MEDIANA,TIPO_GRANDE.'));
  });

  it('reunion con tipo correcto debería crear bien', () => {
    const reunion = new _Reunion('TIPO_PEQUENA', 25000);

    expect(reunion.tipo).toEqual('TIPO_PEQUENA');
    expect(reunion.precio).toEqual(25000);
  });
});
