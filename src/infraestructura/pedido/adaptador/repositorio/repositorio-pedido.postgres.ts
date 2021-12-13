import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { PedidoEntidad } from '../../entidad/pedido.entidad';
import { Pedido } from 'src/dominio/pedido/modelo/pedido';
import { ProductoEntidad } from 'src/infraestructura/producto/entidad/producto.entidad';
import { ReunionEntidad } from 'src/infraestructura/reunion/entidad/reunion.entidad';
import { UsuarioEntidad } from 'src/infraestructura/usuario/entidad/usuario.entidad';

@Injectable()
export class RepositorioPedidoPostgres {
    constructor(
        @InjectRepository(PedidoEntidad)
        private readonly repositorio: Repository<PedidoEntidad>,
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ){}

    async guardar(pedido: Pedido) {
                
        const entidad = new PedidoEntidad();
        entidad.usuario = await this.entityManager.createQueryBuilder()
        .select('usuario')
        .from(UsuarioEntidad, 'usuario')
        .where('usuario.nombre = :nombre', { nombre: pedido.usuario.nombre })
        .getOne();
        entidad.producto = await this.entityManager.createQueryBuilder()
        .select('producto')
        .from(ProductoEntidad, 'producto')
        .where('producto.nombre = :nombre', { nombre: pedido.producto.nombre })
        .getOne();
        entidad.reunion = await this.entityManager.createQueryBuilder()
        .select('reunion')
        .from(ReunionEntidad, 'reunion')
        .where('reunion.tipo = :tipo', { tipo: pedido.reunion.tipo })
        .getOne();
        entidad.fechaRealizacion = pedido.fechaRealizacion;
        entidad.estado = pedido.estado
        entidad.direccion = pedido.direccion;
        entidad.valorTotal = pedido.valorTotal;
        entidad.horasDeServicio = pedido.horasDeServicio;
        await this.repositorio.save(entidad);            
    }
}
