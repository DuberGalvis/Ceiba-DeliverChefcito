import { ErrorValorRequerido } from 'src/dominio/errores/error-valor-requerido';
import { ErrorHoraDeServicio } from 'src/dominio/errores/pedido/error-hora-de-servicio';
import { ErrorLunesNoFestivo } from 'src/dominio/errores/pedido/error-lunes-no-festivo';
import { ErrorNoHayProducto } from 'src/dominio/errores/pedido/error-no-hay-producto';
import { ErrorNoHayReunion } from 'src/dominio/errores/pedido/error-no-hay-reunion';
import { ErrorNoHayUsuario } from 'src/dominio/errores/pedido/error-no-hay-usuario';
import { Producto } from 'src/dominio/producto/modelo/producto';
import { Reunion } from 'src/dominio/reunion/modelo/reunion';
import { Usuario } from 'src/dominio/usuario/modelo/usuario';
import { ErrorFechaNoValida } from 'src/dominio/errores/pedido/error-fecha-no-valida';

const ESTADO_ACTIVO = 'ESTADO_ACTIVO';

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
    this.validarHayUsuario(usuario);
    this.validarHayProducto(producto);
    this.validarHayReunion(reunion);
    this.validarExisteDato(direccion, 'Dirección');
    this.validarExisteValor(valorTotal, 'Valor Total');
    this.validarExisteDato(fechaRealizacion, 'Fecha Realización');
    this.validarHoraDeServicio(horasDeServicio);
    this.validarEsDiaSiguiente(fechaRealizacion);
    this.validarLunesNoFestivo(fechaRealizacion);
    this.#usuario = usuario;
    this.#producto = producto;
    this.#reunion = reunion;
    this.#fechaRealizacion = new Date(fechaRealizacion);
    this.#estado = ESTADO_ACTIVO;
    this.#direccion = direccion;
    this.#horasDeServicio = horasDeServicio;
    this.#valorTotal = valorTotal;
  }

  private validarExisteDato(datoAValidar: string, nombreCampo: string){

    if(!datoAValidar){
      throw new ErrorValorRequerido(
        `El campo ${nombreCampo} esta vacio, es requerido`
      );
    }
  }

  private validarExisteValor(valorAVerificar: number, nombreCampo: string){

    if(isNaN(valorAVerificar)){
      throw new ErrorValorRequerido(
        `El campo ${nombreCampo} esta vacio, es requerido`
      );
    }
  }

  private validarEsDiaSiguiente(fechaAValidar: string){
    const fechaHoy = (new Date()).setHours(0,0,0,0);
    const fechaPedido = (new Date(fechaAValidar)).setHours(0,0,0,0);

    if(fechaPedido <= fechaHoy){
      throw new ErrorFechaNoValida( 
        'La fecha del pedido debe ser mayor a la fecha actual',
      );
    }
  }

  private validarLunesNoFestivo(fechaRealizacion: string) {
    const LUNES = 1;

    let dia = new Date(fechaRealizacion).getDay();

    if (dia === LUNES) {
      throw new ErrorLunesNoFestivo(
        'No se puede agendar pedido para los Lunes',
      );
    }
  }

  private validarHoraDeServicio(horasDeServicio: number) {
    const HORAMAXIMA = 8;
    const HORAMINIMA = 4;

    this.validarExisteValor(horasDeServicio, 'Horas de Servicio');

    if (horasDeServicio > HORAMAXIMA || horasDeServicio < HORAMINIMA) {
      throw new ErrorHoraDeServicio(
        `No se puede sobrepasar las ${HORAMAXIMA} horas o ser menos a ${HORAMINIMA} horas`,
      );
    }
  }

  private validarHayUsuario(usuario: Usuario){
    if(!usuario){
      throw new ErrorNoHayUsuario( 
        'El usuario esta vacio, es requerido',
      );
    }
  }

  private validarHayProducto(producto: Producto){
    if(!producto){
      throw new ErrorNoHayProducto(
        'El Producto esta vacio, es requerido'
      );
    }
  }

  private validarHayReunion(reunion: Reunion){
    if(!reunion){
      throw new ErrorNoHayReunion(
        'La Reunion esta vacia, es requerido'
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
