import { HttpService } from '@nestjs/common';

import { ManejadorConsultarDiaFestivo } from 'src/aplicacion/api/consulta/consultar-dia-festivo.manejador';
import { DiaFestivoDto } from 'src/aplicacion/api/consulta/dto/dia-festivo.dto';
import { ErrorConsultaFallida } from 'src/dominio/errores/pedido/error-consulta-fallida';
import { ErrorHoraDeServicio } from 'src/dominio/errores/pedido/error-hora-de-servicio';
import { ErrorLunesNoFestivo } from 'src/dominio/errores/pedido/error-lunes-no-festivo';
import { ErrorNoHayDireccion } from 'src/dominio/errores/pedido/error-no-hay-direccion';
import { ErrorNoHayProducto } from 'src/dominio/errores/pedido/error-no-hay-producto';
import { ErrorNoHayReunion } from 'src/dominio/errores/pedido/error-no-hay-reunion';
import { ErrorNoHayUsuario } from 'src/dominio/errores/pedido/error-no-hay-usuario';
import { ErrorNoHayValorTotal } from 'src/dominio/errores/pedido/error-no-hay-valortotal';
import { Producto } from 'src/dominio/producto/modelo/producto';
import { Reunion } from 'src/dominio/reunion/modelo/reunion';
import { Usuario } from 'src/dominio/usuario/modelo/usuario';
import { DaoDiaFestivoApi } from 'src/infraestructura/configuracion/api/adaptador/dao-dia-festivo.api';

const ESTADO_ACTIVO = 'ESTADO_ACTIVO';
const ESTADO_CANCELADO = 'ESTADO_CANCELADO';
const ESTADO_FINALIZADO = 'ESTADO_FINALIZADO';
const LUNES = 1;
const HORARIO_MAXIMO = 8;
const HORARIO_MINIMO = 4;
const COLOMBIA = 'CO';
const UNO = 1;
export class Pedido {
  readonly #usuario: Usuario;
  readonly #producto: Producto;
  readonly #reunion: Reunion;
  readonly #fechaRealizacion: Date;
  readonly #estado: string;
  readonly #direccion: string;
  readonly #valorTotal: number;
  readonly #horasDeServicio: number;
  readonly #esFestivo: boolean;
  private readonly _manejadorConsultarDiaFestivo: ManejadorConsultarDiaFestivo;


  constructor(usuario: Usuario, producto: Producto, reunion: Reunion, fechaRealizacion: string, direccion: string, valorTotal: number, horasDeServicio: number) {
    this.#esFestivo = this.validarEsFestivo(fechaRealizacion);
    this.validarHayUsuario(usuario);
    this.validarHayProducto(producto);
    this.validarHayReunion(reunion);
    this.validarHayDireccion(direccion);
    this.validarHayValorTotal(valorTotal);
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
    console.log(this.#esFestivo);
    console.log(dia);
    if (dia === LUNES && this.#esFestivo === false) {
      throw new ErrorLunesNoFestivo(
        'No se puede agendar pedido para este día',
      );
    }
  }

  private validarHoraDeServicio(horasDeServicio: number) {
    if (horasDeServicio > HORARIO_MAXIMO || horasDeServicio < HORARIO_MINIMO) {
      throw new ErrorHoraDeServicio(
        `No se puede sobrepasar las ${HORARIO_MAXIMO} horas o ser menos a ${HORARIO_MINIMO} horas`,
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

  private validarHayDireccion(direccion: string){
    if(!direccion){
      throw new ErrorNoHayDireccion(
        'La direccion esta vacia, es requerido'
      );
    }
  }

  private validarHayValorTotal(valorTotal: number){
    if(!valorTotal){
      throw new ErrorNoHayValorTotal(
        'El valor total esta vacio, es requerido'
      );
    }
  }

  private validarEsFestivo(fechaRealizacion: string): boolean{
    let diaFestivoDto = new DiaFestivoDto;
    let httpService = new HttpService;
    const daoDiaFestivo = new DaoDiaFestivoApi(httpService);
    diaFestivoDto.country = COLOMBIA;
    diaFestivoDto.year = new Date(fechaRealizacion).getFullYear();
    diaFestivoDto.day = new Date(fechaRealizacion).getDate();
    diaFestivoDto.month = new Date(fechaRealizacion).getMonth() + UNO;
    console.log(diaFestivoDto, 'Aqui va')
    let respuesta: Promise<string[]> = daoDiaFestivo.validarEsDiaFestivo(diaFestivoDto);
    respuesta.then(response => {
      if(response.length !== 0){
        return true;
      }
    })
    .catch(error => {
      console.log('error va')
      throw new ErrorConsultaFallida(
        `Error consultando el día festivo: ${error}`
      )}
    );     
    return false;
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

  get esFestivo(): boolean{
    return this.#esFestivo;
  }
}
