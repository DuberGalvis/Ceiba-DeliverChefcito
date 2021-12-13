import { Injectable } from '@nestjs/common';

import { DaoUsuario } from 'src/dominio/usuario/puerto/dao/dao-usuario';
import { UsuarioDto } from './dto/usuario.dto';

@Injectable()
export class ManejadorConsultarUsuario {
    constructor(private _daoUsuario: DaoUsuario){}

    async ejecutar({ nombre, clave }): Promise<UsuarioDto> {
        return this._daoUsuario.consultar(nombre, clave);
    }
}
