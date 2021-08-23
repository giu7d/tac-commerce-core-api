import { generateHashSaltPassword } from '@utils/hash'
import { Account } from '@modules/accounts/entities/Account'
import { ICreateAccountDTO } from '@modules/accounts/dtos/ICreateAccount'
import { IAccountRepository } from '@modules/accounts/repositories/IAccountRepository'
import { AccountWrongConfirmPassword } from '@utils/errors/AccountWrongConfirmPassword'

export class CreateAccount {
	constructor(private accountRepository: IAccountRepository) {}

	public async execute({ confirmPassword, ...data }: ICreateAccountDTO) {
		if (confirmPassword !== data.password)
			throw new AccountWrongConfirmPassword()

		const [salt, password] = generateHashSaltPassword(data.password)

		const account = new Account({
			...data,
			salt,
			password
		})

		await this.accountRepository.save(account)

		return account
	}
}
