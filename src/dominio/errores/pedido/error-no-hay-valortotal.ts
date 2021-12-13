import { ErrorDeNegocio } from "../error-de-negocio";

export class ErrorNoHayValortotal extends ErrorDeNegocio {
    constructor(mensaje: string){
        super(mensaje, ErrorNoHayValortotal.name)
    }
}
