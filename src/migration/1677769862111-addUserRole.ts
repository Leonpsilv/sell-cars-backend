import { MigrationInterface, QueryRunner } from "typeorm"

export class addUserRole1677769862111 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "user_admin" ADD "Role" varchar(150)`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "user_admin" DROP COLUMN "Role"`,
        )
    }

}
