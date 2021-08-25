import { inject, injectable } from 'tsyringe'

import { IOrderRepository } from '@modules/orders/repositories/IOrderRepository'
import { OrderNotFound } from '@utils/errors/OrderNotFound'

import { IShowOrderDTO } from './IShowOrderDTO'
import { OrderForbiddenPermission } from '@utils/errors/OrderForbiddenPermission'
import { IAccountRepository } from '@modules/accounts/repositories/IAccountRepository'
import { AccountNotFound } from '@utils/errors/AccountNotFound'
@injectable()
export class ShowOrderUseCase {
	constructor(
		@inject('AccountRepository')
		private accountRepository: IAccountRepository,
		@inject('OrderRepository')
		private orderRepository: IOrderRepository
	) {}

	async execute(data: IShowOrderDTO) {
		const account = await this.accountRepository.findById(data.accountId)

		if (!account) throw new AccountNotFound()

		const order = await this.orderRepository.findById(data.id)

		if (!order) throw new OrderNotFound()

		if (!account.isAdmin && order.account.id !== data.accountId)
			throw new OrderForbiddenPermission()

		return order
	}
}
