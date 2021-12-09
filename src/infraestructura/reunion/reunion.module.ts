import { Module } from "@nestjs/common";
import { ReunionControlador } from "./controlador/reunion.controlador";
import { ReunionProveedorModule } from "./proveedor/reunion-proveedor.module";


@Module({
    imports: [
        ReunionProveedorModule
    ],
    controllers: [ReunionControlador],
})
export class ReunionModule {}