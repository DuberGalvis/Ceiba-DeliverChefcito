import { ErrorLongitudInvalida } from 'src/dominio/errores/error-longitud-invalida';
import { ErrorValorRequerido } from 'src/dominio/errores/error-valor-requerido';

const NUMERO_MINIMO_CARACTERES_CLAVE = 4;
export class Usuario {
  readonly #nombre: string;
  readonly #clave: string;
  readonly #fechaCreacion: Date;

  constructor(nombre: string, clave: string, fechaCreacion: string) {
    this.validarCampo(nombre, 'Nombre');
    this.validarCampo(fechaCreacion, 'Fecha de Creación');
    this.validarTamanoClave(clave);
    this.#nombre = nombre;
    this.#clave = clave;
    this.#fechaCreacion = new Date(fechaCreacion);
  }

  private validarTamanoClave(clave: string) {

    this.validarCampo(clave, 'Clave');

    if (clave.length < NUMERO_MINIMO_CARACTERES_CLAVE) {
      throw new ErrorLongitudInvalida(
        `El tamaño mínimo de la clave debe ser ${NUMERO_MINIMO_CARACTERES_CLAVE}`,
      );
    }
  }

  private validarCampo(campoAValidar: string, nombreCampo: string){
    if(!campoAValidar){
      throw new ErrorValorRequerido(
      `El campo ${nombreCampo} esta vacio, es requerido`,
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
