import { HttpService, Injectable } from '@nestjs/common';

import { DiaFestivoDto } from 'src/aplicacion/api/consulta/dto/dia-festivo.dto';
import { DaoDiaFestivo } from 'src/dominio/pedido/puerto/dao/dao-dia-festivo';

@Injectable()
export class DaoDiaFestivoApi implements DaoDiaFestivo {
    constructor(private readonly httpService: HttpService) {}
    
    async consultarApiFestivo({country, year, day, month}: DiaFestivoDto): Promise<Array<string>> {
        const esDiaFestivo = await this.httpService.get(
            `${process.env.API_CALENDARIO_FESTIVO}/holidays?api_key=${process.env.API_KEY}&country=${country}&year=${year}&day=${day}&month=${month}`)
            .toPromise();

        return Array.from(esDiaFestivo.data.response.holidays);
    }
}
