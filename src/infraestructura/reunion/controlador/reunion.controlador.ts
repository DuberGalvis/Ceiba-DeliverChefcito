import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';

import { ComandoRegistrarReunion } from 'src/aplicacion/reunion/comando/registrar-reunion.comando';
import { ManejadorRegistrarReunion } from 'src/aplicacion/reunion/comando/registrar-reunion.manejador';
import { ManejadorConsultarReunion } from 'src/aplicacion/reunion/consulta/consulta-reunion.manejador';
import { ReunionDto } from 'src/aplicacion/reunion/consulta/dto/reunion.dto';
import { ManejadorlistarReuniones } from 'src/aplicacion/reunion/consulta/listar-reunion-manejador';

@Controller('reuniones')
export class ReunionControlador {
    constructor(
        private readonly _manejadorRegistrarReunion: ManejadorRegistrarReunion,
        private readonly _mnejadorConsultarReunion: ManejadorConsultarReunion,
        private readonly _manejadorListarReuniones: ManejadorlistarReuniones,
    ) {}
    
    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async crear(@Body() comandoRegistrarReunion: ComandoRegistrarReunion) {
        await this._manejadorRegistrarReunion.ejecutar(comandoRegistrarReunion);
    }

    @Get(':tipo')
    async consultarReunion(@Param('tipo') tipo: string ): Promise<ReunionDto> {
        return this._mnejadorConsultarReunion.ejecutar(tipo);
    }

    @Get()
    async listarReuniones(): Promise<ReunionDto[]> {
        return this._manejadorListarReuniones.ejecutar();
    }
}
