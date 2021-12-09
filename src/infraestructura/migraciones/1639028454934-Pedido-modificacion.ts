import {MigrationInterface, QueryRunner} from "typeorm";

export class PedidoModificacion1639028454934 implements MigrationInterface {
    name = 'PedidoModificacion1639028454934'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "pedido" DROP CONSTRAINT "FK_bdbad0f9d21a8c1ba1aa4ee0962"`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" DROP CONSTRAINT "FK_942e0977463b43139035d94a8da"`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" DROP CONSTRAINT "FK_6fe764ba71f96f2e7a830579be6"`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" DROP COLUMN "usuarioEntidadId"`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" DROP COLUMN "productoId"`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" DROP COLUMN "reunionId"`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" ADD "usuario_id" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" ADD "producto_id" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" ADD "reunion_id" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" ADD CONSTRAINT "FK_a76ebc7864e48113c6b27cf47a9" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" ADD CONSTRAINT "FK_97f69aaf286bdd82afbd487e4d5" FOREIGN KEY ("producto_id") REFERENCES "producto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" ADD CONSTRAINT "FK_92f09cd81c1b5270d79db208426" FOREIGN KEY ("reunion_id") REFERENCES "reunion"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "pedido" DROP CONSTRAINT "FK_92f09cd81c1b5270d79db208426"`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" DROP CONSTRAINT "FK_97f69aaf286bdd82afbd487e4d5"`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" DROP CONSTRAINT "FK_a76ebc7864e48113c6b27cf47a9"`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" DROP COLUMN "reunion_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" DROP COLUMN "producto_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" DROP COLUMN "usuario_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" ADD "reunionId" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" ADD "productoId" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" ADD "usuarioEntidadId" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" ADD CONSTRAINT "FK_6fe764ba71f96f2e7a830579be6" FOREIGN KEY ("reunionId") REFERENCES "reunion"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" ADD CONSTRAINT "FK_942e0977463b43139035d94a8da" FOREIGN KEY ("productoId") REFERENCES "producto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" ADD CONSTRAINT "FK_bdbad0f9d21a8c1ba1aa4ee0962" FOREIGN KEY ("usuarioEntidadId") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
