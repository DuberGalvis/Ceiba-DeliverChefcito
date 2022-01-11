import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsObject} from 'class-validator';

import { Producto } from 'src/dominio/producto/modelo/producto';
import { Reunion } from 'src/dominio/reunion/modelo/reunion';
import { Usuario } from 'src/dominio/usuario/modelo/usuario';


export class ComandoCambiarPedido {
    @IsNumber()
    @ApiProperty({ type: Number })
    public id: number;

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

    @ApiProperty({ type: String})
    public direccion: string;

    @ApiProperty({type: Number})
    public valorTotal: number;

    @ApiProperty({type: Number})
    public horasDeServicio: number;
}
