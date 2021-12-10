import { Injectable } from "@nestjs/common";
import { Pedido } from "src/dominio/pedido/modelo/pedido";
import { ServicioRegistrarPedido } from "src/dominio/pedido/servicio/servicio-registrar-pedido";
import { ComandoRegistrarPedido } from "./registrar-pedido.comando";


@Injectable()
export class ManejadorRegistrarPedido {
    constructor(private _servicioRegistrarPedido: ServicioRegistrarPedido){}

    async ejecutar(comandoRegistrarPedido: ComandoRegistrarPedido){
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