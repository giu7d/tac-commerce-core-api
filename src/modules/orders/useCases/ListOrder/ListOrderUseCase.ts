import { inject, injectable } from 'tsyringe'

import { IOrderRepository } from '@modules/orders/repositories/IOrderRepository'
import { IListOrderDTO } from './IListOrderDTO'
import { IAccountRepository } from '@modules/accounts/repositories/IAccountRepository'
import { AccountNotFound } from '@utils/errors/AccountNotFound'

@injectable()
export class LinkOrderUseCase {
	constructor(
		@inject('AccountRepository')
		private accountRepository: IAccountRepository,
		@inject('OrderRepository')
		private orderRepository: IOrderRepository
	) {}

	async execute({ accountId, ...data }: IListOrderDTO) {
		const account = await this.accountRepository.findById(accountId)

		if (!account) throw new AccountNotFound()

		if (!account.isAdmin)
			return await this.orderRepository.findAll({
				...data,
				account: {
					id: accountId
				}
			})

		return await this.orderRepository.findAll(data)
	}
}
