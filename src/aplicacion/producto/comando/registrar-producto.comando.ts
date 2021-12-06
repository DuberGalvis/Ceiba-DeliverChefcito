import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ComandoRegistrarProducto {
  @IsString()
  @ApiProperty({ example: 'Tacos Mexicanos'})
  public nombre: string;

  @IsString()
  @ApiProperty({ type: Number })
  public precio: number;

  @IsNumber()
  @ApiProperty({ maxLength: 100, example: 'contiene chile habanero...' })
  public detalle: string;
}