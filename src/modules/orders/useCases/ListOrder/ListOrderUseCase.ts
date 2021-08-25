import { inject, injectable } from 'tsyringe'

import { IOrderRepository } from '@modules/orders/repositories/IOrderRepository'
import { IListOrderDTO } from './IListOrderDTO'

@injectable()
export class LinkOrderUseCase {
	constructor(
		@inject('OrderRepository')
		private orderRepository: IOrderRepository
	) {}

	async execute(data: IListOrderDTO) {
		return await this.orderRepository.findAll(data)
	}
}
