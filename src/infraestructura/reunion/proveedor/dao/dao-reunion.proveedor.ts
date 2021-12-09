import { DaoReunion } from "src/dominio/reunion/puerto/dao/dao-reunion";
import { DaoReunionPostgres } from "../../adaptador/dao/dao-reunion-postgres";

export const daoReunionProvider = {
    provide: DaoReunion,
    useClass: DaoReunionPostgres,
};