import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectEntityManager } from "@nestjs/typeorm";
import { ProductoDto } from "src/aplicacion/producto/consulta/dto/producto.dto";
import { DaoProducto } from "src/dominio/producto/puerto/dao/dao-producto";
import { EntityManager } from "typeorm";

@Injectable()
export class DaoProductoPostgres implements DaoProducto {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) {}

    async listar(): Promise<ProductoDto[]> {
        return this.entityManager.query(
          'SELECT p.nombre, p.precio, p.detalle FROM PRODUCTO p',
        );
    }

    async consultar(nombre: string): Promise<ProductoDto> {
        let respuesta: Array<ProductoDto>;
        respuesta = await this.entityManager.query(
        'SELECT p.nombre, p.precio, p.detalle FROM PRODUCTO p WHERE p.nombre = $1',
        [nombre],
        );

        if(respuesta.length === 0){
        throw new NotFoundException("Error, producto no existe")
        }
        
        return respuesta[0];
    }
}