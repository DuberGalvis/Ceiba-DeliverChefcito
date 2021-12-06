
import { ErrorLongitudInvalida } from 'src/dominio/errores/error-longitud-invalida';

const NUMERO_MAXIMO_CARACTERES_DETALLE = 100;
export class Producto {
  readonly #nombre: string;
  readonly #precio: number;
  readonly #detalle: string;

  constructor(nombre: string, precio: number, detalle: string) {
    this.validarTamanoDetalle(detalle);
    this.#nombre = nombre;
    this.#precio = precio;
    this.#detalle = detalle;
  }

  private validarTamanoDetalle(detalle: string) {
    if (detalle.length > NUMERO_MAXIMO_CARACTERES_DETALLE) {
      throw new ErrorLongitudInvalida(
        `El tamaño máximo del detalle debe ser ${NUMERO_MAXIMO_CARACTERES_DETALLE}`,
      );
    }
  }

  get nombre(): string {
    return this.#nombre;
  }

  get precio(): number {
    return this.#precio;
  }

  get detalle(): string {
    return this.#detalle;
  }
}