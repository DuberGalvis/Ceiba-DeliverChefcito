import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PedidoEntidad } from "../../entidad/pedido.entidad";

@Injectable()
export class RepositorioPedidoPostgres {
    constructor(
        @InjectRepository(PedidoEntidad)
        private readonly repositorio: Repository<PedidoEntidad>
    ){}
}