import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsObject, IsString } from "class-validator";

import { Producto } from "src/dominio/producto/modelo/producto";
import { Reunion } from "src/dominio/reunion/modelo/reunion";
import { Usuario } from "src/dominio/usuario/modelo/usuario";


export class ComandoCambiarPedido {
    @IsObject()
    @ApiProperty({ type: Usuario })
    public usuario: Usuario;

    @IsObject()
    @ApiProperty({ type: Producto})
    public producto: Producto;

    @IsObject()
    @ApiProperty({ type: Reunion})
    public reunion: Reunion;
    
    @IsDateString()
    @ApiProperty({type: Date})
    public fechaRealizacion: string;

    @IsString()
    @ApiProperty({ type: String})
    public direccion: string;

    @IsNumber()
    @ApiProperty({type: Number})
    public valorTotal: number;
}