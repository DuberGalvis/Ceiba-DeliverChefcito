import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity({ name: 'producto' })
export class ProductoEntidad{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    precio: number;

    @Column()
    detalle: string;
}
