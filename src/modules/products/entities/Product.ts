import { v4 } from 'uuid'
import {
	Entity,
	PrimaryColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	OneToMany
} from 'typeorm'
import { OrderItem } from '@modules/orders/entities/OrderItem'

type ProductProps = Omit<
	Product,
	'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>

@Entity()
export class Product {
	@PrimaryColumn({
		type: 'uuid',
		unique: true
	})
	id: string

	@Column()
	name: string

	@Column()
	category: string

	@Column({
		type: 'float'
	})
	unitPrice: number

	@Column()
	quantity: number

	@Column({
		type: 'json'
	})
	additionalInformation: any

	@OneToMany(() => OrderItem, item => item.product)
	orderItems: OrderItem[]

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date

	@DeleteDateColumn()
	deletedAt: Date

	constructor(props: ProductProps, id?: string) {
		Object.assign(this, props)

		if (!id) this.id = v4()
	}
}
