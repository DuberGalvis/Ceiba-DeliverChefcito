import { Injectable } from "@nestjs/common";

import { DaoReunion } from "src/dominio/reunion/puerto/dao/dao-reunion";
import { ReunionDto } from "./dto/reunion.dto";

@Injectable()
export class ManejadorConsultarReunion {
    constructor(private _daoReunion: DaoReunion) {}

    async ejecutar(tipo: string): Promise<ReunionDto> {
        return this._daoReunion.consultar(tipo);
    }
}