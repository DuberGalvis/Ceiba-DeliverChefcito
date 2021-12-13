import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ManejadorRegistrarReunion } from 'src/aplicacion/reunion/comando/registrar-reunion.manejador';
import { ManejadorConsultarReunion } from 'src/aplicacion/reunion/consulta/consulta-reunion.manejador';
import { DaoReunion } from 'src/dominio/reunion/puerto/dao/dao-reunion';
import { RepositorioReunion } from 'src/dominio/reunion/puerto/repositorio/repositorio-reunion';
import { ServicioRegistrarReunion } from 'src/dominio/reunion/servicio/servicio-registrar-reunion';
import { ReunionEntidad } from '../entidad/reunion.entidad';
import { daoReunionProvider } from './dao/dao-reunion.proveedor';
import { repositorioReunionProvider } from './repositorio/repositorio-reunion.proveedor';
import { servicioRegistrarReunionProveedor } from './servicio/servicio-registrar-reunion.proveedor';

@Module({
    imports: [TypeOrmModule.forFeature([ReunionEntidad])],
    providers: [
        {provide: ServicioRegistrarReunion, inject: [RepositorioReunion], useFactory: servicioRegistrarReunionProveedor},
        repositorioReunionProvider,
        daoReunionProvider,
        ManejadorRegistrarReunion,
        ManejadorConsultarReunion,
    ],
    exports: [
        ServicioRegistrarReunion,
        ManejadorRegistrarReunion,
        ManejadorConsultarReunion,
        RepositorioReunion,
        DaoReunion,
    ],
})
export class ReunionProveedorModule {

}
