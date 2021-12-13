import { ErrorDeNegocio } from '../error-de-negocio';

export class ErrorNoHayUsuario extends ErrorDeNegocio {
    constructor(mensaje: string){
        super(mensaje, ErrorNoHayUsuario.name);
    }
}
