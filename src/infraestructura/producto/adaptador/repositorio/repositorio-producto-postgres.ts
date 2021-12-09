import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Producto } from "src/dominio/producto/modelo/producto";
import { RepositorioProducto } from "src/dominio/producto/puerto/repositorio/repositorio-producto";
import { Repository } from "typeorm";
import { ProductoEntidad } from "../../entidad/producto.entidad";

@Injectable()
export class RepositorioProductoPostgres  implements RepositorioProducto {
    constructor(
        @InjectRepository(ProductoEntidad)
        private readonly repositorio: Repository<ProductoEntidad>,
    ) {}

    async existeNombreProducto(nombre: string): Promise<boolean> {
        return (await this.repositorio.count({nombre})) > 0;
    }

    async guardar(producto: Producto) {
        const entidad = new ProductoEntidad();
        entidad.nombre = producto.nombre;
        entidad.precio = producto.precio;
        entidad.detalle = producto.detalle;
        await this.repositorio.save(entidad);
    }
}