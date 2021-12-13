import { DaoPedido } from 'src/dominio/pedido/puerto/dao/dao-pedido'
import { DaoPedidoPostgres } from '../../adaptador/dao/dao-pedido.postgres'

export const daoPedidoProvider = {
    provide: DaoPedido,
    useClass: DaoPedidoPostgres,
};
