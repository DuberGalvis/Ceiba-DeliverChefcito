import { ErrorDeNegocio } from '../error-de-negocio';

export class ErrorFechaNoValida extends ErrorDeNegocio {
    constructor(mensaje: string){
        super(mensaje, ErrorFechaNoValida.name);
    }
}
