import { MigrationInterface, QueryRunner } from "typeorm"

export class newCarPhotoColumn1678286429949 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "car" ADD "alt" varchar(100)`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "car" DROP COLUMN "alt"`,
        )
    }

}
