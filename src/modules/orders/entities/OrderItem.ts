import { v4 } from 'uuid'
import {
	Entity,
	PrimaryColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	ManyToOne
} from 'typeorm'
import { Product } from '@modules/products/entities/Product'
import { Order } from './Order'

type OrderItemProps = Omit<
	OrderItem,
	'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>

@Entity()
export class OrderItem {
	@PrimaryColumn({
		type: 'uuid',
		unique: true
	})
	id: string

	@Column({
		type: 'float'
	})
	unitPrice: number

	@Column({
		type: 'float'
	})
	totalPrice: number

	@Column()
	quantity: number

	@ManyToOne(() => Product, product => product.orderItems)
	product: Product

	@ManyToOne(() => Order, order => order.items)
	order: Order

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date

	@DeleteDateColumn()
	deletedAt: Date

	constructor(props: OrderItemProps, id?: string) {
		Object.assign(this, props)

		if (!id) this.id = v4()
	}
}
