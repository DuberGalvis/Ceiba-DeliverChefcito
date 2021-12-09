import { RepositorioReunion } from '../puerto/repositorio/repositorio-reunion';
import { Reunion } from '../modelo/reunion';
import { ErrorDeNegocio } from 'src/dominio/errores/error-de-negocio';

export class ServicioRegistrarReunion {

  constructor(private readonly _repositorioReunion: RepositorioReunion) {
  }

  async ejecutar(reunion: Reunion) {
    await this._repositorioReunion.guardar(reunion);
  }
}
