import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';

import { ComandoRegistrarProducto } from 'src/aplicacion/producto/comando/registrar-producto.comando';
import { ManejadorRegistrarProducto } from 'src/aplicacion/producto/comando/registrar-producto.manejador';
import { ManejadorConsultarProducto } from 'src/aplicacion/producto/consulta/consultar-producto.manejador';
import { ProductoDto } from 'src/aplicacion/producto/consulta/dto/producto.dto';
import { ManejadorListarProducto } from 'src/aplicacion/producto/consulta/listar-producto.manejador';

@Controller('productos')
export class ProductoControlador {
    constructor(
        private readonly _manejadorRegistrarProducto: ManejadorRegistrarProducto,
        private readonly _manejadorListarProducto: ManejadorListarProducto,
        private readonly _manejadorConsultarProducto: ManejadorConsultarProducto,
    ) {}

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async crear(@Body() comandoRegistrarProducto: ComandoRegistrarProducto) {
        await this._manejadorRegistrarProducto.ejecutar(comandoRegistrarProducto);
    }

    @Get()
    async consultarProducto(@Body('nombre') nombre: string): Promise<ProductoDto> {
        return this._manejadorConsultarProducto.ejecutar(nombre);
    }
}
