import { ErrorDeNegocio } from '../error-de-negocio';

export class ErrorNoHayReunion extends ErrorDeNegocio {
    constructor(mensaje: string){
        super(mensaje, ErrorNoHayReunion.name);
    }
}
