import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class ComandoRegistrarReunion {
    @IsString()
    @ApiProperty({ example: 'TIPO_GRANDE' })
    public tipo: string;

    @IsNumber()
    @ApiProperty({ type: Number })
    public precio: number;
}