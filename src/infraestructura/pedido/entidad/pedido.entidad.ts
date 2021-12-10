import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { UsuarioEntidad } from "src/infraestructura/usuario/entidad/usuario.entidad";
import { ProductoEntidad } from "src/infraestructura/producto/entidad/producto.entidad";
import { ReunionEntidad } from "src/infraestructura/reunion/entidad/reunion.entidad";

@Entity({ name: 'pedido' })
export class PedidoEntidad {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne( type => UsuarioEntidad, {cascade: true, nullable: false, eager: true}  )
    @JoinColumn({ name: 'usuario_id' })
    usuario: UsuarioEntidad;

    @ManyToOne( type => ProductoEntidad, {cascade: true, nullable: false, eager: true}  )
    @JoinColumn({ name: 'producto_id' })
    producto: ProductoEntidad;

    @ManyToOne( type => ReunionEntidad, {cascade: true, nullable: false, eager: true} )
    @JoinColumn({ name: 'reunion_id' })
    reunion: ReunionEntidad;

    @Column()
    fechaRealizacion: Date;

    @Column()
    estado: string;

    @Column()
    direccion: string;

    @Column()
    valorTotal: number;

    @Column()
    horasDeServicio: number;
}
