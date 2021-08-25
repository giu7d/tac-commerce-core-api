import { inject, injectable } from 'tsyringe'

import { IOrderRepository } from '@modules/orders/repositories/IOrderRepository'

import { IModifyOrderDTO } from './IModifyOrderDTO'

@injectable()
export class ModifyOrderUseCase {
	constructor(
		@inject('OrderRepository')
		private orderRepository: IOrderRepository
	) {}

	async execute({ id, shipmentStatus }: IModifyOrderDTO) {
		await this.orderRepository.modify(id, { shipmentStatus })
	}
}
