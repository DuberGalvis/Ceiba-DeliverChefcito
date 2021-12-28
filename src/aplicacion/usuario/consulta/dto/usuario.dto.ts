import { ApiProperty } from '@nestjs/swagger';

export class UsuarioDto {

  @ApiProperty({ example: 'William' })
  nombre: string;

  @ApiProperty({ example: '1234' })
  clave: string;

  @ApiProperty({ type: Date })
  fechaCreacion: string;
}
