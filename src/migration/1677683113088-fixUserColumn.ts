import { MigrationInterface, QueryRunner } from "typeorm"

export class fixUserColumn1677683113088 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "user_admin" RENAME COLUMN "cpf" TO "Cpf"`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "user_admin" RENAME COLUMN "Cpf" TO "cpf"`,
        )
    }

}
