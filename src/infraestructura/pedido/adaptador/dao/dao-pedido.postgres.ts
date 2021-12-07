import { Injectable } from "@nestjs/common";
import { InjectEntityManager } from "@nestjs/typeorm";
import { PedidoDto } from "src/aplicacion/pedido/consulta/dto/pedido.dto";
import { EntityManager } from "typeorm";

@Injectable()
export class DaoPedidoPostgres {
    constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    ){}

    async listar(): Promise<PedidoDto[]> {
        return this.entityManager.query(
          'SELECT * FROM PEDIDO',
        );
    }
}