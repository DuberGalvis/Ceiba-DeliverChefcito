import { Injectable } from "@nestjs/common";

import { DaoUsuario } from "src/dominio/usuario/puerto/dao/dao-usuario";

@Injectable()
export class ManejadorCambiarUsuario {
    constructor(private _daoUsuario: DaoUsuario){}

    async ejecutar({nombre, claveActual, claveNueva}) {
        return this._daoUsuario.cambiar(nombre, claveActual, claveNueva);
    }
}