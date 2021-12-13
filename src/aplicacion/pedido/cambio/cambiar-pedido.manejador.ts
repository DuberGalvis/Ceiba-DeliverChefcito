import { Injectable } from '@nestjs/common';

import { DaoPedido } from 'src/dominio/pedido/puerto/dao/dao-pedido';
import { ComandoCambiarPedido } from './cambiar-pedido.comando';


@Injectable()
export class ManejadorCambiarPedido {
    constructor(private _daoPedido: DaoPedido ) {}

    async ejecutar(comandoCambiarPedido: ComandoCambiarPedido) {
        return this._daoPedido.cambiarPedido(comandoCambiarPedido);
    }
}
