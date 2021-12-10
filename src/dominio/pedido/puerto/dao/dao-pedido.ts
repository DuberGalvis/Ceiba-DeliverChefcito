import { ComandoCambiarPedido } from 'src/aplicacion/pedido/cambio/cambiar-pedido.comando';
import { PedidoDto } from 'src/aplicacion/pedido/consulta/dto/pedido.dto';


export abstract class DaoPedido {
  abstract async listar(nombre: string): Promise<PedidoDto[]>;
  abstract async cambiarPedido(comandoCambiarPedido: ComandoCambiarPedido);
}