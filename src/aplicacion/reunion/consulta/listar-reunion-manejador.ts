import { Injectable } from "@nestjs/common";

import { DaoReunion } from "src/dominio/reunion/puerto/dao/dao-reunion";
import { ReunionDto } from "./dto/reunion.dto";

@Injectable()
export class ManejadorlistarReuniones {
    constructor(private _daoReunion: DaoReunion) {}

    async ejecutar(): Promise<ReunionDto[]>{
        return this._daoReunion.listarReuniones();
    }
}
