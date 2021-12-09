import { ApiProperty } from "@nestjs/swagger";

export class ReunionDto {
    @ApiProperty({ example: 'TIPO_GRANDE' })
    tipo: string;

    @ApiProperty({ type: Number })
    precio: number;
}