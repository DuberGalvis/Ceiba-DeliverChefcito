import {MigrationInterface, QueryRunner} from "typeorm";

export class UsuarioInit1638909619692 implements MigrationInterface {
    name = 'UsuarioInit1638909619692'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "usuario" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "clave" character varying NOT NULL, "fechaCreacion" TIMESTAMP NOT NULL, CONSTRAINT "PK_a56c58e5cabaa04fb2c98d2d7e2" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "producto" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "precio" integer NOT NULL, "detalle" character varying NOT NULL, CONSTRAINT "PK_5be023b11909fe103e24c740c7d" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "reunion" ("id" SERIAL NOT NULL, "tipo" character varying NOT NULL, "precio" integer NOT NULL, CONSTRAINT "PK_652787e3902f73f2fa98dafd64c" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "pedido" ("id" SERIAL NOT NULL, "fechaRealizacion" TIMESTAMP NOT NULL, "estado" character varying NOT NULL, "direccion" character varying NOT NULL, "valorTotal" integer NOT NULL, "usuarioEntidadId" integer, "productoId" integer, "reunionId" integer, CONSTRAINT "PK_af8d8b3d07fae559c37f56b3f43" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" ADD CONSTRAINT "FK_bdbad0f9d21a8c1ba1aa4ee0962" FOREIGN KEY ("usuarioEntidadId") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" ADD CONSTRAINT "FK_942e0977463b43139035d94a8da" FOREIGN KEY ("productoId") REFERENCES "producto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" ADD CONSTRAINT "FK_6fe764ba71f96f2e7a830579be6" FOREIGN KEY ("reunionId") REFERENCES "reunion"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "pedido" DROP CONSTRAINT "FK_6fe764ba71f96f2e7a830579be6"`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" DROP CONSTRAINT "FK_942e0977463b43139035d94a8da"`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" DROP CONSTRAINT "FK_bdbad0f9d21a8c1ba1aa4ee0962"`, undefined);
        await queryRunner.query(`DROP TABLE "pedido"`, undefined);
        await queryRunner.query(`DROP TABLE "reunion"`, undefined);
        await queryRunner.query(`DROP TABLE "producto"`, undefined);
        await queryRunner.query(`DROP TABLE "usuario"`, undefined);
    }

}
