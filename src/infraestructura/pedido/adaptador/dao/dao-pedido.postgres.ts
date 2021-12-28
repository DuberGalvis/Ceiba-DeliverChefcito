import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { PedidoDto } from 'src/aplicacion/pedido/consulta/dto/pedido.dto';
import { DaoPedido } from 'src/dominio/pedido/puerto/dao/dao-pedido';
import { ProductoEntidad } from 'src/infraestructura/producto/entidad/producto.entidad';
import { ReunionEntidad } from 'src/infraestructura/reunion/entidad/reunion.entidad';
import { UsuarioEntidad } from 'src/infraestructura/usuario/entidad/usuario.entidad';
import { EntityManager } from 'typeorm';
import { PedidoEntidad } from '../../entidad/pedido.entidad';

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
        .where('usuario.nombre = :nombre', { nombre })
        .getOne();
        return this.entityManager.query(
          `SELECT p.fecha_realizacion AS "fechaRealizacion", p.direccion, 
          p.valor_total AS "valorTotal", p.horas_de_servicio AS "horasDeServicio", 
          pro.nombre AS "nombreProducto", r.tipo AS "tipoReunion" 
          FROM PEDIDO p, PRODUCTO pro, reunion r 
          WHERE usuario_id = $1 
          AND estado = 'ESTADO_ACTIVO'
          AND producto_id = pro.id
          AND reunion_id = r.id`,
          [usuario.id]
        );
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
        entidad.fecha_realizacion = fechaRealizacion;
        entidad.direccion = direccion;
        entidad.valor_total = valorTotal;
        
        await this.entityManager.createQueryBuilder()
        .update(PedidoEntidad)
        .set({
          producto: entidad.producto, reunion: entidad.reunion,
          fecha_realizacion: entidad.fecha_realizacion,
          direccion: entidad.direccion, valor_total: entidad.valor_total
        })
        .where('usuario_id = :id', { id: entidad.usuario.id })
        .execute();
    }
}
