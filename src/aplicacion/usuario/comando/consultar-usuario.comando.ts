import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ComandoConsultarUsuario {
    @IsString()
    @ApiProperty({ example: 'William'})
    public nombre: string;

    @IsString()
    @ApiProperty({ minLength: 4, example: '1234' })
    public clave: string;
}