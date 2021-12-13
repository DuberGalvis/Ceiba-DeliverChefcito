import { ErrorValorRequerido } from 'src/dominio/errores/error-valor-requerido';
import { ErrorTipoIncorrecto } from 'src/dominio/errores/reunion/error-tipo-incorrecto';

const TIPO: string[] = ['TIPO_PEQUENA', 'TIPO_MEDIANA', 'TIPO_GRANDE'];

export class Reunion {
  readonly #tipo: string;
  readonly #precio: number;

  constructor(tipo: string, precio: number) {
    this.validarTipoReunion(tipo);
    this.validarPrecio(precio);
    this.#tipo = tipo;
    this.#precio = precio;
  }

  private validarTipoReunion(tipo: string) {
    if (!TIPO.includes(tipo)) {
      throw new ErrorTipoIncorrecto(
        `El tipo de reunion debe ser: ${TIPO.toString()}.`,
      );
    }
  }

  private validarPrecio (precio: number){
    if(!precio){
      throw new ErrorValorRequerido(
        'El precio esta vacio, es requerido'
      );
    }
  }

  get tipo(): string {
    return this.#tipo;
  }

  get precio(): number {
    return this.#precio;
  }
}
