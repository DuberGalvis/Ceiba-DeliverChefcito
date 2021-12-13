import { ErrorDeNegocio } from '../error-de-negocio';

export class ErrorLunesNoFestivo extends ErrorDeNegocio {
    constructor(mensaje: string){
        super(mensaje, ErrorLunesNoFestivo.name)
    }
}
