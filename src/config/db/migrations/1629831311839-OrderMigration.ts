import { MigrationInterface, QueryRunner } from 'typeorm'

export class OrderMigration1629831311839 implements MigrationInterface {
	name = 'OrderMigration1629831311839'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "order_item" ("id" uuid NOT NULL, "unitPrice" double precision NOT NULL, "totalPrice" double precision NOT NULL, "quantity" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "productId" uuid, "orderId" uuid, CONSTRAINT "PK_d01158fe15b1ead5c26fd7f4e90" PRIMARY KEY ("id"))`
		)
		await queryRunner.query(
			`CREATE TABLE "order" ("id" uuid NOT NULL, "shipmentAddress" json NOT NULL, "shipmentStatus" character varying NOT NULL, "paymentStatus" character varying NOT NULL, "totalPrice" double precision NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "accountId" uuid, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`
		)
		await queryRunner.query(
			`ALTER TABLE "order_item" ADD CONSTRAINT "FK_904370c093ceea4369659a3c810" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		)
		await queryRunner.query(
			`ALTER TABLE "order_item" ADD CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		)
		await queryRunner.query(
			`ALTER TABLE "order" ADD CONSTRAINT "FK_8cb9cecbc8b09bf60c71f7a9680" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "order" DROP CONSTRAINT "FK_8cb9cecbc8b09bf60c71f7a9680"`
		)
		await queryRunner.query(
			`ALTER TABLE "order_item" DROP CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0"`
		)
		await queryRunner.query(
			`ALTER TABLE "order_item" DROP CONSTRAINT "FK_904370c093ceea4369659a3c810"`
		)
		await queryRunner.query(`DROP TABLE "order"`)
		await queryRunner.query(`DROP TABLE "order_item"`)
	}
}
