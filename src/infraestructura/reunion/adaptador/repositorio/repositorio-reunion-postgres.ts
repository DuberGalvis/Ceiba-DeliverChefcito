import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { RepositorioReunion } from "src/dominio/reunion/puerto/repositorio/repositorio-reunion";
import { ReunionEntidad } from "../../entidad/reunion.entidad";
import { Reunion } from "src/dominio/reunion/modelo/reunion";

@Injectable()
export class RepositorioReunionPostgres implements RepositorioReunion {
    constructor(
        @InjectRepository(ReunionEntidad)
        private readonly repositorio: Repository<ReunionEntidad>,
    ) {}

    async existeTipoReunion(tipo: string): Promise<boolean> {
        return (await this.repositorio.count({ tipo })) > 0;
    }

    async guardar(reunion: Reunion) {
        const entidad = new ReunionEntidad();
        entidad.tipo = reunion.tipo;
        entidad.precio = reunion.precio;
        await this.repositorio.save(entidad);
    }
}