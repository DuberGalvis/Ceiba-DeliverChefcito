import { ApiProperty } from '@nestjs/swagger';

export class DiaFestivoDto {

    @ApiProperty({ type: String})
    country: string;

    @ApiProperty({ type: Number})
    year: number;

    @ApiProperty({ type: Number})
    day: number;

    @ApiProperty({ type: Number})
    month: number;
}
