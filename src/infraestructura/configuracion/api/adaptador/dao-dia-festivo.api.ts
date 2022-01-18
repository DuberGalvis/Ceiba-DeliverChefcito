import { HttpService, Injectable } from '@nestjs/common';

import { DiaFestivoDto } from 'src/aplicacion/api/consulta/dto/dia-festivo.dto';
import { DaoDiaFestivo } from 'src/dominio/pedido/puerto/dao/dao-dia-festivo';

@Injectable()
export class DaoDiaFestivoRemoto implements DaoDiaFestivo {
    
    async consultarApiFestivo({country, year, day, month}: DiaFestivoDto): Promise<boolean> {
        let httpService = new HttpService;
        let respuesta: string[] = [];

        const esDiaFestivo = await httpService.get(
            `${process.env.API_CALENDARIO_FESTIVO}/holidays?api_key=${process.env.API_KEY}&country=${country}&year=${year}&day=${day}&month=${month}`)
            .toPromise();
        
        respuesta = Array.from(esDiaFestivo.data.response.holidays);
        console.log(respuesta);
        if(respuesta.length > 0){
            return true;
        }

        return false;
    }
}
