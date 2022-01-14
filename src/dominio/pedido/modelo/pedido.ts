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
import { DiaFestivoDto } from 'src/aplicacion/api/consulta/dto/dia-festivo.dto';
import { HttpService } from '@nestjs/common';
import { DaoDiaFestivoApi } from 'src/infraestructura/configuracion/api/adaptador/dao-dia-festivo.api';

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
    this.#valorTotal = this.validarCobroDoble(valorTotal, producto, reunion, fechaRealizacion);
    this.#horasDeServicio = horasDeServicio;
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

  private async validarEsFestivo(fechaAValidar: string): Promise<boolean>{
    const COLOMBIA = 'CO';
    const UNO = 1;
    let respuesta: string[] = [];
    const fechaFestivo: DiaFestivoDto = {
      country: '',
      year: 0,
      day: 0,
      month: 0,
    };

    fechaFestivo.country = COLOMBIA;
    fechaFestivo.year = new Date(fechaAValidar).getFullYear();
    fechaFestivo.day = new Date(fechaAValidar).getDate();
    fechaFestivo.month = new Date(fechaAValidar).getMonth() + UNO;

    respuesta = await this.irConsultarFestivo(fechaFestivo);

    if(respuesta.length > 0){
      return true;
    }

     return false;
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
    const OCHO = 8;
    const CUATRO = 4;

    this.validarExisteValor(horasDeServicio, 'Horas de Servicio');

    if (horasDeServicio > OCHO || horasDeServicio < CUATRO) {
      throw new ErrorHoraDeServicio(
        `No se puede sobrepasar las ${OCHO} horas o ser menos a ${CUATRO} horas`,
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

  private validarCobroDoble(valorTotal: number,producto: Producto, reunion: Reunion, fehaPedido: string): number {
    let esCobroDoble = false;
    const DOBLE = 2;
    let respuestaFestivo = this.validarEsFestivo(fehaPedido);

    respuestaFestivo
    .then((respuesta: boolean) => {esCobroDoble = respuesta;})
    .catch(() => {esCobroDoble = false;});

    if(esCobroDoble){
      return (producto.precio + reunion.precio) * DOBLE;
    }
    
    return valorTotal;
  }

  private async irConsultarFestivo(fechaFestivo: DiaFestivoDto): Promise<string[]>{
    let httpService = new HttpService;
    const daoDiaFestivo = new DaoDiaFestivoApi(httpService);

    return daoDiaFestivo.consultarApiFestivo(fechaFestivo)
    .then((fechaResuelta: string[]) => fechaResuelta)
    .catch(() => []); 
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
