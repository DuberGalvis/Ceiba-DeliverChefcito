import { RepositorioReunion } from 'src/dominio/reunion/puerto/repositorio/repositorio-reunion';
import { RepositorioReunionPostgres } from '../../adaptador/repositorio/repositorio-reunion-postgres';

export const repositorioReunionProvider = {
    provide: RepositorioReunion,
    useClass: RepositorioReunionPostgres,
};
