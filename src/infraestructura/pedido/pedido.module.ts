import { Module } from "@nestjs/common";

import { PedidoControlador } from "./controlador/pedido.controlador";


@Module({
    imports: [],
    controllers: [PedidoControlador],
})
export class PedidoModule {}