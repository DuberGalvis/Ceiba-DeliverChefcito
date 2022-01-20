import { Injectable } from '@nestjs/common';
import { DiaFestivoDto } from 'src/aplicacion/api/consulta/dto/dia-festivo.dto';
import { Pedido } from 'src/dominio/pedido/modelo/pedido';
import { ServicioRegistrarPedido } from 'src/dominio/pedido/servicio/servicio-registrar-pedido';
import { DaoDiaFestivoRemoto } from 'src/infraestructura/configuracion/api/adaptador/dao-dia-festivo.api';
import { ComandoRegistrarPedido } from './registrar-pedido.comando';


@Injectable()
export class ManejadorRegistrarPedido {
    constructor(private _servicioRegistrarPedido: ServicioRegistrarPedido){}

    async ejecutar(comandoRegistrarPedido: ComandoRegistrarPedido){
        const daoDiaFestivo = new DaoDiaFestivoRemoto;
        const COLOMBIA = 'CO';
        const UN_MES = 1;
        const COBRO_DOBLE = 2;
        const fechaFestivo: DiaFestivoDto = {
        country: '',
        year: 0,
        day: 0,
        month: 0,
        };

        fechaFestivo.country = COLOMBIA;
        fechaFestivo.year = new Date(comandoRegistrarPedido.fechaRealizacion).getFullYear();
        fechaFestivo.day = new Date(comandoRegistrarPedido.fechaRealizacion).getDate();
        fechaFestivo.month = new Date(comandoRegistrarPedido.fechaRealizacion).getMonth() + UN_MES;

        const esFestivo = await daoDiaFestivo.consultarApiFestivo(fechaFestivo);

        if(esFestivo){
            comandoRegistrarPedido.valorTotal *= COBRO_DOBLE;
        }
        await this._servicioRegistrarPedido.ejecutar(
            new Pedido(
                comandoRegistrarPedido.usuario,
                comandoRegistrarPedido.producto,
                comandoRegistrarPedido.reunion,
                comandoRegistrarPedido.fechaRealizacion,
                comandoRegistrarPedido.direccion,
                comandoRegistrarPedido.valorTotal,
                comandoRegistrarPedido.horasDeServicio,
            ),
        );
    }
}
