import { ErrorDeNegocio } from '../error-de-negocio';

export class ErrorHoraDeServicio extends ErrorDeNegocio {
    constructor(mensaje: string){
        super(mensaje, ErrorHoraDeServicio.name);
    }
}
