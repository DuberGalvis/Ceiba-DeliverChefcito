import { ReunionDto } from 'src/aplicacion/reunion/consulta/dto/reunion.dto';

export abstract class DaoReunion {
    abstract async consultar(tipo: string): Promise<ReunionDto>;
    abstract async listarReuniones(): Promise<ReunionDto[]>;
}
