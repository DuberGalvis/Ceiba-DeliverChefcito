import { RepositorioReunion } from 'src/dominio/reunion/puerto/repositorio/repositorio-reunion';
import { ServicioRegistrarReunion } from 'src/dominio/reunion/servicio/servicio-registrar-reunion';

export function servicioRegistrarReunionProveedor(repositorioReunion: RepositorioReunion) {
    return new ServicioRegistrarReunion(repositorioReunion);
}
