import { HttpService, Injectable } from '@nestjs/common';

import { DiaFestivoDto } from 'src/aplicacion/api/consulta/dto/dia-festivo.dto';
import { DaoDiaFestivo } from 'src/dominio/pedido/puerto/dao/dao-dia-festivo';

@Injectable()
export class DaoDiaFestivoApi implements DaoDiaFestivo {
    constructor(private readonly httpService: HttpService) {}
    
    async validarEsDiaFestivo({country, year, day, month}: DiaFestivoDto): Promise<Array<string>> {
        const esDiaFestivo = await this.httpService.get(
            `https://calendarific.com/api/v2/holidays?
            &api_key=cb28a8e03e75118e12eedf405e2405264999d4ce
            &country=${country.toString}
            &year=${year.toString}
            &day=${day.toString}
            &month=${month.toString}`)
        .toPromise();
        
        return Array.from(esDiaFestivo.data.response.holidays);
    }
}
