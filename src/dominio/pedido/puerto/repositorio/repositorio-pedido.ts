import { Pedido } from '../../modelo/pedido';

export abstract class RepositorioPedido {
  abstract async validarLunesNoFestivo(fechaRealizacion: string): Promise<boolean>;
  abstract async guardar(pedido: Pedido);
}