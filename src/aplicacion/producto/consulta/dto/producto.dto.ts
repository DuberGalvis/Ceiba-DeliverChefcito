import { ApiProperty } from '@nestjs/swagger';

export class ProductoDto {

  @ApiProperty({ example: 'Tacos Mexicanos' })
  nombre: string;

  @ApiProperty({ type: Number })
  precio: number;

  @ApiProperty({ maxLength: 100, example: 'contiene chile habanero...' })
  detalle: string;

  @ApiProperty({ example: '../../imagenes' })
  nombreImagen: string;
}
