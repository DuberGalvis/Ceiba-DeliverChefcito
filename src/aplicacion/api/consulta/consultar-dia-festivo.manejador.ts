import { Injectable } from '@nestjs/common';
import { DaoDiaFestivo } from 'src/dominio/pedido/puerto/dao/dao-dia-festivo';
import { DiaFestivoDto } from './dto/dia-festivo.dto';

@Injectable()
export class ManejadorConsultarDiaFestivo {
    constructor(private _daoDiaFestivo: DaoDiaFestivo) {}

    async ejecutar(esFestivo: DiaFestivoDto): Promise<Array<string>>{
        return this._daoDiaFestivo.consultarApiFestivo(esFestivo);
    }
}
