import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectEntityManager } from "@nestjs/typeorm";
import { ReunionDto } from "src/aplicacion/reunion/consulta/dto/reunion.dto";
import { DaoReunion } from "src/dominio/reunion/puerto/dao/dao-reunion";
import { EntityManager } from "typeorm";

@Injectable()
export class DaoReunionPostgres implements DaoReunion {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) {}

    async consultar(tipo): Promise<ReunionDto> {
        let respuesta: Array<ReunionDto>;
        respuesta = await this.entityManager.query(
            'SELECT r.tipo, r.precio FROM REUNION r WHERE r.tipo = $1',
            [tipo],
        );

        if(respuesta.length === 0){
            throw new NotFoundException("No se encuentra el tipo")
          }
          
          return respuesta[0];
    }
}