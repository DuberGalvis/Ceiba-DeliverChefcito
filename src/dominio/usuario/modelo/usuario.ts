import { ErrorLongitudInvalida } from 'src/dominio/errores/error-longitud-invalida';
import { ErrorValorRequerido } from 'src/dominio/errores/error-valor-requerido';

const NUMERO_MINIMO_CARACTERES_CLAVE = 4;
export class Usuario {
  readonly #nombre: string;
  readonly #clave: string;
  readonly #fechaCreacion: Date;

  constructor(nombre: string, clave: string, fechaCreacion: string) {
    this.validarTamanoClave(clave);
    this.validarFechaCreacion(fechaCreacion);
    this.#nombre = nombre;
    this.#clave = clave;
    this.#fechaCreacion = new Date(fechaCreacion);
  }

  private validarTamanoClave(clave: string) {
    if (clave.length < NUMERO_MINIMO_CARACTERES_CLAVE) {
      throw new ErrorLongitudInvalida(
        `El tamaño mínimo de la clave debe ser ${NUMERO_MINIMO_CARACTERES_CLAVE}`,
      );
    }
  }

  private validarFechaCreacion(fechaCreacion: string) {
    if (fechaCreacion.length === 0) {
      throw new ErrorValorRequerido(
        'El valor de la fecha de creación es requerido',
      );
    }
  }

  get nombre(): string {
    return this.#nombre;
  }

  get clave(): string {
    return this.#clave;
  }

  get fechaCreacion(): Date {
    return this.#fechaCreacion;
  }
}
