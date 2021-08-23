import { IAccountRepository } from '@modules/accounts/repositories/IAccountRepository'
import { AccountNotFound } from '@utils/errors/AccountNotFound'

export class ShowAccount {
	constructor(private accountRepository: IAccountRepository) {}

	public async execute(data: { id: string }) {
		const account = await this.accountRepository.findById(data.id)

		if (!account) throw new AccountNotFound()

		return account
	}
}
