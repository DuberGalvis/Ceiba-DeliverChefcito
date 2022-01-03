import { Body, Controller, Get, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';

import { ComandoCambiarPedido } from 'src/aplicacion/pedido/cambio/cambiar-pedido.comando';
import { ManejadorCambiarPedido } from 'src/aplicacion/pedido/cambio/cambiar-pedido.manejador';
import { ComandoCancelarPedido } from 'src/aplicacion/pedido/cambio/cancelar-pedido.comando';
import { ManejadorCancelarPedido } from 'src/aplicacion/pedido/cambio/cancelar-pedido.manejador';
import { ComandoRegistrarPedido } from 'src/aplicacion/pedido/comando/registrar-pedido.comando';
import { ManejadorRegistrarPedido } from 'src/aplicacion/pedido/comando/registrar-pedido.manejador';
import { PedidoDto } from 'src/aplicacion/pedido/consulta/dto/pedido.dto';
import { ManejadorListarPedido } from 'src/aplicacion/pedido/consulta/listar-pedido.manejador';


@Controller('pedidos')
export class PedidoControlador {
    constructor(
        private readonly _manejadorRegistrarPedido: ManejadorRegistrarPedido,
        private readonly _manejadorListarPedido: ManejadorListarPedido,
        private readonly _manejadorCambiarPedido: ManejadorCambiarPedido,
        private readonly _manejadorCancelarPedido: ManejadorCancelarPedido,
    ){}

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async crear(@Body() comandoRegistrarPedido: ComandoRegistrarPedido) {
        await this._manejadorRegistrarPedido.ejecutar(comandoRegistrarPedido);
    }

    @Get()
    async listarPedidos(@Query('nombre') nombre: string): Promise<PedidoDto[]>{
        return this._manejadorListarPedido.ejecutar(nombre);
    }

    @Patch()
    async modificarPedido(@Body() comandoCambiarPedido: ComandoCambiarPedido) {
        return this._manejadorCambiarPedido.ejecutar(comandoCambiarPedido);
    }

    @Patch('/cancelar')
    async cancelarPedido(@Body() comandoCancelarPedido: ComandoCancelarPedido): Promise<string>  {
        return this._manejadorCancelarPedido.ejecutar(comandoCancelarPedido);
    }
}
