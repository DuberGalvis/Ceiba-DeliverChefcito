import { ErrorDeNegocio } from 'src/dominio/errores/error-de-negocio';
import { Producto } from 'src/dominio/producto/modelo/producto';
import { Reunion } from 'src/dominio/reunion/modelo/reunion';
import { Usuario } from 'src/dominio/usuario/modelo/usuario';


const ESTADO_ACTIVO = 'ESTADO_ACTIVO';
const ESTADO_CANCELADO = 'ESTADO_CANCELADO';
const ESTADO_FINALIZADO = 'ESTADO_FINALIZADO';
const LUNES = 0;
const HORARIO_MAXIMO = 8;
export class Pedido {
  readonly #usuario: Usuario;
  readonly #producto: Producto;
  readonly #reunion: Reunion;
  readonly #fechaRealizacion: Date;
  readonly #estado: string;
  readonly #direccion: string;
  readonly #valorTotal: number;
  readonly #horasDeServicio: number;


  constructor(usuario: Usuario, producto: Producto, reunion: Reunion, fechaRealizacion: string, direccion: string, valorTotal: number, horasDeServicio: number) {
    this.validarLunesNoFestivo(fechaRealizacion);
    this.validarHoraDeServicio(horasDeServicio);
    this.#usuario = usuario;
    this.#producto = producto;
    this.#reunion = reunion;
    this.#fechaRealizacion = new Date(fechaRealizacion);
    this.#estado = ESTADO_ACTIVO;
    this.#direccion = direccion;
    this.#valorTotal = valorTotal;
    this.#horasDeServicio = horasDeServicio;
  }

  private validarLunesNoFestivo(fechaRealizacion: string) {
    let dia = new Date(fechaRealizacion).getDay();
    if (dia === LUNES) {
      throw new ErrorDeNegocio(
        'No se puede agendar pedido para este día',
      );
    }
  }

  private validarHoraDeServicio(horasDeServicio: number) {
    if (horasDeServicio > HORARIO_MAXIMO) {
      throw new ErrorDeNegocio(
        `No se puede sobrepasar las ${HORARIO_MAXIMO} horas de servicio`,
      );
    }
  }

  get usuario(): Usuario {
    return this.#usuario;
  }

  get producto(): Producto {
    return this.#producto;
  }

  get reunion(): Reunion {
    return this.#reunion;
  }

  get fechaRealizacion(): Date {
    return this.#fechaRealizacion;
  }

  get estado(): string {
    return this.#estado;
  }

  get direccion(): string{
    return this.#direccion;
  }

  get valorTotal(): number{
    return this.#valorTotal;
  }

  get horasDeServicio(): number{
    return this.#horasDeServicio;
  }
}