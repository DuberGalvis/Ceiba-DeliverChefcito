import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ComandoCancelarPedido {
    @IsNumber()
    @ApiProperty({ type: Number })
    public id: number;
}
