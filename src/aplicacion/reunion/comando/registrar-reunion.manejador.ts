import { Injectable } from "@nestjs/common";
import { Reunion } from "src/dominio/reunion/modelo/reunion";
import { ServicioRegistrarReunion } from "src/dominio/reunion/servicio/servicio-registrar-reunion";
import { ComandoRegistrarReunion } from "./registrar-reunion.comando";

@Injectable()
export class ManejadorRegistrarReunion {
    constructor(private _servicioRegistrarReunion: ServicioRegistrarReunion) {}

    async ejecutar(comandoRegistrarReunion: ComandoRegistrarReunion) {
        await this._servicioRegistrarReunion.ejecutar(
            new Reunion(
                comandoRegistrarReunion.tipo,
                comandoRegistrarReunion.precio,
            ),
        );
    }
}