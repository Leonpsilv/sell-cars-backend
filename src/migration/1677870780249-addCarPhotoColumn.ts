import { MigrationInterface, QueryRunner } from "typeorm"

export class addCarPhotoColumn1677870780249 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "car" ADD "Key" varchar(255)`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "car" DROP COLUMN "Key"`,
        )
    }

}
