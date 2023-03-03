import { MigrationInterface, QueryRunner } from "typeorm"

export class changeCarPhotoColumnName1677793535972 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "car_photo" RENAME COLUMN "Link" TO "Url"`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "car_photo" RENAME COLUMN "Url" TO "Link"`,
        )
    }

}
