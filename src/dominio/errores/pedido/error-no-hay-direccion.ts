import { ErrorDeNegocio } from '../error-de-negocio';

export class ErrorNoHayDireccion extends ErrorDeNegocio {
    constructor(mensaje: string) {
        super(mensaje, ErrorNoHayDireccion.name)
    }
}
