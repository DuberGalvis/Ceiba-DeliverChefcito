import { Injectable } from '@nestjs/common';

import { DaoUsuario } from 'src/dominio/usuario/puerto/dao/dao-usuario';

@Injectable()
export class ManejadorEliminarUsuario {
    constructor(private _daoUsuario: DaoUsuario) {}

    async ejecutar(nombre: string) {
        return this._daoUsuario.eliminar(nombre);
    }
}
