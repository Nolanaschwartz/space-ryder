import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1719812480710 implements MigrationInterface {
    name = 'InitialMigration1719812480710'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."trip_tripstatus_enum" AS ENUM('SCHEDULED', 'IN_FLIGHT', 'LANDED', 'CANCELLED')`);
        await queryRunner.query(`ALTER TABLE "trip" ADD "tripStatus" "public"."trip_tripstatus_enum" NOT NULL DEFAULT 'SCHEDULED'`);
        await queryRunner.query(`ALTER TABLE "trip" ADD "departureAt" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "trip" ADD "arrivalAt" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trip" DROP COLUMN "arrivalAt"`);
        await queryRunner.query(`ALTER TABLE "trip" DROP COLUMN "departureAt"`);
        await queryRunner.query(`ALTER TABLE "trip" DROP COLUMN "tripStatus"`);
        await queryRunner.query(`DROP TYPE "public"."trip_tripstatus_enum"`);
    }

}
