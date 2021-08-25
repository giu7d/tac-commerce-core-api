import { inject, injectable } from 'tsyringe'

import { IOrderRepository } from '@modules/orders/repositories/IOrderRepository'
import { OrderNotFound } from '@utils/errors/OrderNotFound'

@injectable()
export class ShowOrderUseCase {
	constructor(
		@inject('OrderRepository')
		private orderRepository: IOrderRepository
	) {}

	async execute(data: { id: string }) {
		const order = await this.orderRepository.findById(data.id)

		if (!order) throw new OrderNotFound()

		return order
	}
}
