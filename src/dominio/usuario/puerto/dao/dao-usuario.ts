import { UsuarioDto } from 'src/aplicacion/usuario/consulta/dto/usuario.dto';

export abstract class DaoUsuario {
  abstract async consultar(nombre: string, clave: string): Promise<UsuarioDto>;
  abstract async cambiar(nombre: string, claveActual: string, claveNueva: string);
}
