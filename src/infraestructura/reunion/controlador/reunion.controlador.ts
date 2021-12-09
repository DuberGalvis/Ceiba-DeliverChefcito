import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { ComandoRegistrarReunion } from "src/aplicacion/reunion/comando/registrar-reunion.comando";
import { ManejadorRegistrarReunion } from "src/aplicacion/reunion/comando/registrar-reunion.manejador";
import { ManejadorConsultarReunion } from "src/aplicacion/reunion/consulta/consulta-reunion.manejador";
import { ReunionDto } from "src/aplicacion/reunion/consulta/dto/reunion.dto";

@Controller('reuniones')
export class ReunionControlador {
    constructor(
        private readonly _manejadorRegistrarReunion: ManejadorRegistrarReunion,
        private readonly _mnejadorConsultarReunion: ManejadorConsultarReunion,
    ) {}
    
    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async crear(@Body() comandoRegistrarReunion: ComandoRegistrarReunion) {
        await this._manejadorRegistrarReunion.ejecutar(comandoRegistrarReunion);
    }

    @Get()
    async consultarReunion(@Body('tipo') tipo: string ): Promise<ReunionDto> {
        return this._mnejadorConsultarReunion.ejecutar(tipo);
    }
}