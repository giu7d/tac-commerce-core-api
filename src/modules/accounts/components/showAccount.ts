import { IShowAccountDTO } from '@modules/accounts/dtos/IShowAccount'
import { IAccountRepository } from '@modules/accounts/repositories/IAccountRepository'
import { DBError } from '@utils/errors/dbError'

export class ShowAccount {
	constructor(private accountRepository: IAccountRepository) {}

	public async execute(data: IShowAccountDTO) {
		const account = await this.accountRepository.findById(data.id)

		if (!account) throw new DBError('The account does not exist!', 'Account')

		return account
	}
}
