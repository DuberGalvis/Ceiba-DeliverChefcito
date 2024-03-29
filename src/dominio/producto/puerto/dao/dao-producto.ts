import { ProductoDto } from 'src/aplicacion/producto/consulta/dto/producto.dto';

export abstract class DaoProducto {
  abstract async listar(): Promise<ProductoDto[]>;
  abstract async consultar(nombre: string): Promise<ProductoDto>;
}
