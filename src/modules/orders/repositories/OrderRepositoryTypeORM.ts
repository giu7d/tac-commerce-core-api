import { FindConditions, getRepository, Repository } from 'typeorm'
import { Order } from '../entities/Order'
import { IOrderRepository } from './IOrderRepository'

export class OrderRepositoryTypeORM implements IOrderRepository {
	repository: Repository<Order>

	constructor() {
		this.repository = getRepository(Order)
	}

	async save(order: Order) {
		await this.repository.save(order)
	}

	async findAll(order: FindConditions<Order>) {
		return await this.repository.find({
			where: order,
			relations: ['items', 'items.product', 'account']
		})
	}

	async findById(id: string) {
		return await this.repository.findOne(
			{ id },
			{
				relations: ['items', 'items.product', 'account']
			}
		)
	}

	async modify(id: string, order: Partial<Omit<Order, 'id'>>) {
		await this.repository.update({ id }, order)
	}

	async delete(id: string) {
		await this.repository.softDelete({ id })
	}
}
