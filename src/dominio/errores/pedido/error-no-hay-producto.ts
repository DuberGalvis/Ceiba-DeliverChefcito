import { ErrorDeNegocio } from '../error-de-negocio';

export class ErrorNoHayProducto extends ErrorDeNegocio {
    constructor(mensaje: string){
        super(mensaje, ErrorNoHayProducto.name);
    }
}