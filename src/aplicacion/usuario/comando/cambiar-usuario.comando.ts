import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ComandoCambiarUsuario {
    @IsString()
    @ApiProperty({ example: 'William'})
    public nombre: string;

    @IsString()
    @ApiProperty({ minLength: 4, example: '1235' })
    public claveActual: string;

    @IsString()
    @ApiProperty({ minLength: 4, example: '1234' })
    public claveNueva: string;
}
