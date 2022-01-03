import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ManejadorCambiarPedido } from 'src/aplicacion/pedido/cambio/cambiar-pedido.manejador';
import { ManejadorCancelarPedido } from 'src/aplicacion/pedido/cambio/cancelar-pedido.manejador';
import { ManejadorRegistrarPedido } from 'src/aplicacion/pedido/comando/registrar-pedido.manejador';
import { ManejadorListarPedido } from 'src/aplicacion/pedido/consulta/listar-pedido.manejador';
import { DaoPedido } from 'src/dominio/pedido/puerto/dao/dao-pedido';
import { RepositorioPedido } from 'src/dominio/pedido/puerto/repositorio/repositorio-pedido';
import { ServicioRegistrarPedido } from 'src/dominio/pedido/servicio/servicio-registrar-pedido';
import { PedidoEntidad } from '../entidad/pedido.entidad';
import { daoPedidoProvider } from './dao/dao-pedido.proveedor';
import { repositorioPedidoProvider } from './repositorio/repositorio-pedido.proveedor';
import { servicioRegistrarPedidoProveedor } from './servicio/servicio-registrar-pedido.proveedor';


@Module({
    imports: [TypeOrmModule.forFeature([PedidoEntidad])],
    providers: [
        { provide: ServicioRegistrarPedido, inject: [RepositorioPedido], useFactory: servicioRegistrarPedidoProveedor },
        repositorioPedidoProvider,
        daoPedidoProvider,
        ManejadorRegistrarPedido,
        ManejadorListarPedido,
        ManejadorCambiarPedido,
        ManejadorCancelarPedido,
    ],
    exports: [
        ServicioRegistrarPedido,
        ManejadorRegistrarPedido,
        ManejadorListarPedido,
        ManejadorCambiarPedido,
        ManejadorCancelarPedido,
        DaoPedido,
    ],
})
export class PedidoProveedorModule {

}
