import { HttpService, Injectable } from '@nestjs/common';

import { DiaFestivoDto } from 'src/aplicacion/api/consulta/dto/dia-festivo.dto';
import { DaoDiaFestivo } from 'src/dominio/pedido/puerto/dao/dao-dia-festivo';

@Injectable()
export class DaoDiaFestivoApi implements DaoDiaFestivo {
    constructor(private readonly httpService: HttpService) {}

    async validarEsDiaFestivo({country, year, day, month}: DiaFestivoDto): Promise<Array<string>> {
        const esDiaFestivo = await this.httpService.get(
            `${process.env.API_CALENDARIO_FESTIVO}/holidays?
            &api_key${process.env.API_KEY}
            &country=${country.toString}
            &year=${year.toString}
            &day=${day.toString}
            &month=${month.toString}`)
        .toPromise();

        console.log(esDiaFestivo);
        console.log(esDiaFestivo.data.response.holidays);
        return Array.from(esDiaFestivo.data.response.holidays);
    }
}
