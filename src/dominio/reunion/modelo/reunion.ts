import { ErrorValorRequerido } from 'src/dominio/errores/error-valor-requerido';

const TIPO: string[] = ['TIPO_PEQUENA', 'TIPO_MEDIANA', 'TIPO_GRANDE'];

export class Reunion {
  readonly #tipo: string;
  readonly #precio: number;

  constructor(tipo: string, precio: number) {
    this.validarTipoReunion(tipo);
    this.#tipo = tipo;
    this.#precio = precio;
  }

  private validarTipoReunion(tipo: string) {
    if (!TIPO.includes(tipo)) {
      throw new ErrorValorRequerido(
        `El tipo de reunion debe ser: ${TIPO.toString()}.`,
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