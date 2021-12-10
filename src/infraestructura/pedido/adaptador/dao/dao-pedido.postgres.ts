import { Injectable } from "@nestjs/common";
import { InjectEntityManager } from "@nestjs/typeorm";
import { PedidoDto } from "src/aplicacion/pedido/consulta/dto/pedido.dto";
import { DaoPedido } from "src/dominio/pedido/puerto/dao/dao-pedido";
import { ProductoEntidad } from "src/infraestructura/producto/entidad/producto.entidad";
import { ReunionEntidad } from "src/infraestructura/reunion/entidad/reunion.entidad";
import { UsuarioEntidad } from "src/infraestructura/usuario/entidad/usuario.entidad";
import { EntityManager } from "typeorm";
import { PedidoEntidad } from "../../entidad/pedido.entidad";

@Injectable()
export class DaoPedidoPostgres implements DaoPedido {
    constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    ){}

    async listar(nombre: string): Promise<PedidoDto[]> {
        let usuario = await this.entityManager.createQueryBuilder()
        .select('usuario')
        .from(UsuarioEntidad, 'usuario')
        .where('usuario.nombre = :nombre', { nombre: nombre})
        .getOne()
        return this.entityManager.query(
          "SELECT * FROM PEDIDO p WHERE p.usuario_id = $1 AND p.estado = 'ESTADO_ACTIVO'",
          [usuario.id]
        )
    }

    async cambiarPedido({ usuario, producto, reunion, fechaRealizacion, direccion, valorTotal }) {

      const entidad = new PedidoEntidad();
        entidad.usuario = await this.entityManager.createQueryBuilder()
        .select('usuario')
        .from(UsuarioEntidad, 'usuario')
        .where('usuario.nombre = :nombre', { nombre: usuario.nombre })
        .getOne();
        entidad.producto = await this.entityManager.createQueryBuilder()
        .select('producto')
        .from(ProductoEntidad, 'producto')
        .where('producto.nombre = :nombre', { nombre: producto.nombre })
        .getOne();
        entidad.reunion = await this.entityManager.createQueryBuilder()
        .select('reunion')
        .from(ReunionEntidad, 'reunion')
        .where('reunion.tipo = :tipo', { tipo: reunion.tipo })
        .getOne();
        entidad.fechaRealizacion = fechaRealizacion;
        entidad.direccion = direccion;
        entidad.valorTotal = valorTotal;
        
        await this.entityManager.createQueryBuilder()
        .update(PedidoEntidad)
        .set({
          producto: entidad.producto, reunion: entidad.reunion,
          fechaRealizacion: entidad.fechaRealizacion,
          direccion: entidad.direccion, valorTotal: entidad.valorTotal
        })
        .where('usuario_id = :id', { id: entidad.usuario.id })
        .execute()
        console.log(entidad.usuario.id)  
    }
}