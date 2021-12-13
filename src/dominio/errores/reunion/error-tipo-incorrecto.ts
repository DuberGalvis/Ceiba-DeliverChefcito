import { ErrorDeNegocio } from '../error-de-negocio';

export class ErrorTipoIncorrecto extends ErrorDeNegocio {
    constructor(mensaje: string){
        super(mensaje, ErrorTipoIncorrecto.name);
    }
}
