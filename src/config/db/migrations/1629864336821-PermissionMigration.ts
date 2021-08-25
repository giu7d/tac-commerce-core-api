import { MigrationInterface, QueryRunner } from 'typeorm'

export class PermissionMigration1629864336821 implements MigrationInterface {
	name = 'PermissionMigration1629864336821'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "public"."account" ADD "isAdmin" boolean NOT NULL`
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "public"."account" DROP COLUMN "isAdmin"`
		)
	}
}
