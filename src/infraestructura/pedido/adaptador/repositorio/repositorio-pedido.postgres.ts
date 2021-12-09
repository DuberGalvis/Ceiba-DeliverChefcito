import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Pedido } from "src/dominio/pedido/modelo/pedido";
import { Repository } from "typeorm";

import { PedidoEntidad } from "../../entidad/pedido.entidad";

@Injectable()
export class RepositorioPedidoPostgres {
    constructor(
        @InjectRepository(PedidoEntidad)
        private readonly repositorio: Repository<PedidoEntidad>,
    ){}

    async guardar(pedido: Pedido) {
        const entidad = new PedidoEntidad();
        // entidad.usuario = pedido.usuario;
        // entidad.producto = pedido.producto;
        // entidad.reunion = pedido.reunion;
        entidad.fechaRealizacion = pedido.fechaRealizacion;
        entidad.direccion = pedido.direccion;
        entidad.valorTotal = pedido.valorTotal;
        await this.repositorio.save(entidad);
    }
}