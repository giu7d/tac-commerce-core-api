import { v4 } from 'uuid'
import {
	Entity,
	PrimaryColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	OneToMany,
	ManyToOne
} from 'typeorm'
import { OrderItem } from './OrderItem'
import { Account } from '@modules/accounts/entities/Account'

type OrderProps = Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>

@Entity()
export class Order {
	@PrimaryColumn({
		type: 'uuid',
		unique: true
	})
	id: string

	@Column({
		type: 'json'
	})
	shipmentAddress: {
		additionalInformation: string
		number: string
		street: string
		city: string
		uf: string
		cep: string
	}

	@Column()
	shipmentStatus: 'ordered' | 'shipped' | 'received'

	@Column()
	paymentStatus: 'waiting-approval' | 'approved' | 'returned'

	@Column({
		type: 'float'
	})
	totalPrice: number

	@ManyToOne(() => Account, account => account.orders)
	account: Account

	@OneToMany(() => OrderItem, item => item.order, { cascade: true })
	items: OrderItem[]

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date

	@DeleteDateColumn()
	deletedAt: Date

	constructor(props: OrderProps, id?: string) {
		Object.assign(this, props)

		if (!id) this.id = v4()
	}
}
