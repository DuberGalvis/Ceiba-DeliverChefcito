import { RepositorioProducto } from 'src/dominio/producto/puerto/repositorio/repositorio-producto';
import { RepositorioProductoPostgres } from '../../adaptador/repositorio/repositorio-producto-postgres';

export const repositorioProductoProvider = {
    provide: RepositorioProducto,
    useClass: RepositorioProductoPostgres,
};