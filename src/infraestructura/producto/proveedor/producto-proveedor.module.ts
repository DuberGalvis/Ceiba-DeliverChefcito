import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ManejadorRegistrarProducto } from 'src/aplicacion/producto/comando/registrar-producto.manejador';
import { ManejadorConsultarProducto } from 'src/aplicacion/producto/consulta/consultar-producto.manejador';
import { ManejadorListarProducto } from 'src/aplicacion/producto/consulta/listar-producto.manejador';
import { DaoProducto } from 'src/dominio/producto/puerto/dao/dao-producto';
import { RepositorioProducto } from 'src/dominio/producto/puerto/repositorio/repositorio-producto';
import { ServicioRegistrarProducto } from 'src/dominio/producto/servicio/servicio-registrar-producto';
import { ProductoEntidad } from '../entidad/producto.entidad';
import { daoProductoProvider } from './dao/dao-producto.proveedor';
import { repositorioProductoProvider } from './repositorio/repositorio-producto.proveedor';
import { servicioRegistrarProductoProveedor } from './servicio/servicio-registrar-producto.proveedor';

@Module({
    imports: [TypeOrmModule.forFeature([ProductoEntidad])],
    providers: [
        { provide: ServicioRegistrarProducto, inject:[RepositorioProducto], useFactory: servicioRegistrarProductoProveedor},
        repositorioProductoProvider,
        daoProductoProvider,
        ManejadorRegistrarProducto,
        ManejadorListarProducto,
        ManejadorConsultarProducto,
    ],
    exports: [
        ServicioRegistrarProducto,
        ManejadorRegistrarProducto,
        ManejadorListarProducto,
        ManejadorConsultarProducto,
        RepositorioProducto,
        DaoProducto,        
    ],
})
export class ProductoProveedorModule {

}
