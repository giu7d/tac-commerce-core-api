import { inject, injectable } from 'tsyringe'

import { AccountNotFound } from '@utils/errors/AccountNotFound'
import { IAccountRepository } from '@modules/accounts/repositories/IAccountRepository'

@injectable()
export class AdminPermissionService {
	constructor(
		@inject('AccountRepository')
		private accountRepository: IAccountRepository
	) {}

	async execute(data: { id: string }) {
		const account = await this.accountRepository.findById(data.id)

		if (!account) throw new AccountNotFound()

		return account.isAdmin
	}
}
