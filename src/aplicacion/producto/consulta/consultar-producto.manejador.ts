import { Injectable } from '@nestjs/common';

import { DaoProducto } from 'src/dominio/producto/puerto/dao/dao-producto';
import { ProductoDto } from './dto/producto.dto';

@Injectable()
export class ManejadorConsultarProducto {
    constructor(private _daoProducto: DaoProducto) {}

    async ejecutar (nombre: string): Promise<ProductoDto> {
        return this._daoProducto.consultar(nombre);
    }
}
