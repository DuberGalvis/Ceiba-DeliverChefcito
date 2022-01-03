import { Injectable } from '@nestjs/common';

import { DaoPedido } from 'src/dominio/pedido/puerto/dao/dao-pedido';
import { ComandoCancelarPedido } from './cancelar-pedido.comando';


@Injectable()
export class ManejadorCancelarPedido {
    constructor(private _daoPedido: DaoPedido ) {}

    async ejecutar(comandoCancelarPedido: ComandoCancelarPedido): Promise<string> {
        return this._daoPedido.cancelarPedido(comandoCancelarPedido);
    }
}