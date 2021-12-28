import { ErrorDeNegocio } from '../error-de-negocio';

export class ErrorNoHayValorTotal extends ErrorDeNegocio {
    constructor(mensaje: string){
        super(mensaje, ErrorNoHayValorTotal.name);
    }
}
