import { v4 } from 'uuid'
import {
	Entity,
	PrimaryColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	BeforeUpdate,
	BeforeInsert
} from 'typeorm'

type AccountProps = Omit<
	Account,
	'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>

@Entity()
export class Account {
	@PrimaryColumn({
		type: 'uuid',
		unique: true
	})
	id: string

	@Column()
	firstName: string

	@Column()
	lastName: string

	@Column({ unique: true })
	email: string

	@Column()
	password: string

	@Column()
	salt: string

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date

	@DeleteDateColumn()
	deletedAt: Date

	@BeforeUpdate()
	@BeforeInsert()
	private setLowerCase() {
		this.firstName = this.firstName.toLowerCase()
		this.lastName = this.lastName.toLowerCase()
	}

	constructor(props: AccountProps, id?: string) {
		Object.assign(this, props)

		if (!id) this.id = v4()
	}
}
