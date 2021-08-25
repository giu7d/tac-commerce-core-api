import { inject, injectable } from 'tsyringe'

import { generateHashSaltPassword } from '@utils/hash'
import { Account } from '@modules/accounts/entities/Account'
import { ICreateAccountDTO } from '@modules/accounts/useCases/CreateAccount/ICreateAccountDTO'
import { IAccountRepository } from '@modules/accounts/repositories/IAccountRepository'
import { AccountWrongConfirmPassword } from '@utils/errors/AccountWrongConfirmPassword'

@injectable()
export class CreateAccountUseCase {
	constructor(
		@inject('AccountRepository')
		private accountRepository: IAccountRepository
	) {}

	public async execute({ confirmPassword, ...data }: ICreateAccountDTO) {
		if (confirmPassword !== data.password)
			throw new AccountWrongConfirmPassword()

		const [salt, password] = generateHashSaltPassword(data.password)

		const account = new Account({
			...data,
			orders: [],
			salt,
			password
		})

		await this.accountRepository.save(account)

		return account
	}
}
