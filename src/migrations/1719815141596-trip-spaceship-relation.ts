import { MigrationInterface, QueryRunner } from "typeorm";

export class TripSpaceshipRelation1719815141596 implements MigrationInterface {
    name = 'TripSpaceshipRelation1719815141596'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trip" ADD "spaceShipId" integer`);
        await queryRunner.query(`ALTER TABLE "trip" ADD CONSTRAINT "FK_ef3e4e8a258f6a0f44c60748866" FOREIGN KEY ("spaceShipId") REFERENCES "space_ship"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trip" DROP CONSTRAINT "FK_ef3e4e8a258f6a0f44c60748866"`);
        await queryRunner.query(`ALTER TABLE "trip" DROP COLUMN "spaceShipId"`);
    }

}
