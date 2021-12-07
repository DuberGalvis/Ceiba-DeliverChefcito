import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'reunion' })
export class ReunionEntidad {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tipo: string;

    @Column()
    precio: number;
}
