import { ErrorDeNegocio } from '../error-de-negocio';

export class ErrorConsultaFallida extends ErrorDeNegocio {
    constructor(mensaje: string){
        super(mensaje, ErrorConsultaFallida.name);
    }
}
