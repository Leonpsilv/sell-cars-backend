import { MigrationInterface, QueryRunner } from "typeorm"

export class addCarColumn1677857365100 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "car" ADD "Description" varchar(255)`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "car" DROP "Description"`,
        )
    }

}
