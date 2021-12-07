import { ApiProperty } from '@nestjs/swagger';

import { Producto } from 'src/dominio/producto/modelo/producto';
import { Reunion } from 'src/dominio/reunion/modelo/reunion';

export class PedidoDto {

  @ApiProperty({ type: Producto})
  producto: Producto;

  @ApiProperty({ type: Reunion })
  reunion: Reunion;

  @ApiProperty({ type: Date })
  fechaRealizacion: string;

  @ApiProperty({ })
  estado: string;

  @ApiProperty({ type: String })
  direccion: string;

  @ApiProperty({type: Number })
  valorTotal: number;
}