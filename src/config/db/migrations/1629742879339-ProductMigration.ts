import { MigrationInterface, QueryRunner } from 'typeorm'

export class ProductMigration1629742879339 implements MigrationInterface {
	name = 'ProductMigration1629742879339'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "product" ("id" uuid NOT NULL, "name" character varying NOT NULL, "category" character varying NOT NULL, "unitPrice" double precision NOT NULL, "quantity" integer NOT NULL, "additionalInformation" json NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "product"`)
	}
}
