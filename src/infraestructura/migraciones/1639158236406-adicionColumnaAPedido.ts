import {MigrationInterface, QueryRunner} from "typeorm";

export class adicionColumnaAPedido1639158236406 implements MigrationInterface {
    name = 'adicionColumnaAPedido1639158236406'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "pedido" ADD "horasDeServicio" integer NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "pedido" DROP COLUMN "horasDeServicio"`, undefined);
    }

}
