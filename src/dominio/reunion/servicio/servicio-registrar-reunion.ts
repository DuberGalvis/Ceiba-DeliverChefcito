import { RepositorioReunion } from '../puerto/repositorio/repositorio-reunion';
import { Reunion } from '../modelo/reunion';
import { ErrorDeNegocio } from 'src/dominio/errores/error-de-negocio';

export class ServicioRegistrarReunion {

  constructor(private readonly _repositorioReunion: RepositorioReunion) {
  }

  async ejecutar(reunion: Reunion) {
    if (await this._repositorioReunion.existeTipoReunion(reunion.tipo)) {
      throw new ErrorDeNegocio(
        `El tipo de reunion ${reunion.tipo} ya existe`,
      );
    }
    await this._repositorioReunion.guardar(reunion);
  }
}
