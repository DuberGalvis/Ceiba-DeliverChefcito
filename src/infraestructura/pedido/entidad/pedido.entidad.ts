import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { UsuarioEntidad } from "src/infraestructura/usuario/entidad/usuario.entidad";
import { ProductoEntidad } from "src/infraestructura/producto/entidad/producto.entidad";
import { ReunionEntidad } from "src/infraestructura/reunion/entidad/reunion.entidad";
import { ESTADO } from "src/dominio/pedido/modelo/pedido";

@Entity({ name: 'pedido' })
export class PedidoEntidad {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne( () => UsuarioEntidad )
    @JoinColumn()
    usuarioEntidad: UsuarioEntidad;

    @ManyToOne( () => ProductoEntidad )
    @JoinColumn()
    producto: ProductoEntidad;

    @ManyToOne( () => ReunionEntidad )
    @JoinColumn()
    reunion: ReunionEntidad;

    @Column()
    fechaRealizacion: Date;

    @Column()
    estado: ESTADO;

    @Column()
    direccion: string;

    @Column()
    valorTotal: number;
}
