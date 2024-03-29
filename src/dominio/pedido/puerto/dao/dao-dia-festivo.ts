import { DiaFestivoDto } from 'src/aplicacion/api/consulta/dto/dia-festivo.dto';

export abstract class DaoDiaFestivo {
    abstract async consultarApiFestivo(esFestivo: DiaFestivoDto): Promise<boolean>;
}
