import {MigrationInterface, QueryRunner} from "typeorm";

export class ModificanColumnasPedidoYUsuario1640634555297 implements MigrationInterface {
    name = 'ModificanColumnasPedidoYUsuario1640634555297'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "usuario" RENAME COLUMN "fechaCreacion" TO "fecha_creacion"`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" DROP COLUMN "horasDeServicio"`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" DROP COLUMN "fechaRealizacion"`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" DROP COLUMN "valorTotal"`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" ADD "fecha_realizacion" TIMESTAMP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" ADD "valor_total" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" ADD "horas_de_servicio" integer NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "pedido" DROP COLUMN "horas_de_servicio"`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" DROP COLUMN "valor_total"`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" DROP COLUMN "fecha_realizacion"`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" ADD "valorTotal" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" ADD "fechaRealizacion" TIMESTAMP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" ADD "horasDeServicio" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "usuario" RENAME COLUMN "fecha_creacion" TO "fechaCreacion"`, undefined);
    }

}
