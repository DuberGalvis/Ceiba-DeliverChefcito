import { Reunion } from '../../modelo/reunion';

export abstract class RepositorioReunion {
  abstract async existeTipoReunion(tipo: string): Promise<boolean>;
  abstract async guardar(reunion: Reunion);
}
