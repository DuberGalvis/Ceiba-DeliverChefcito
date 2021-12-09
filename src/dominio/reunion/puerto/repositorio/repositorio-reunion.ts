import { Reunion } from '../../modelo/reunion';

export abstract class RepositorioReunion {
  abstract async guardar(reunion: Reunion);
}
