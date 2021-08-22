import { v4 } from 'uuid'

import { HttpError } from '@utils/errors/httpError'
import { getHashPassword } from '@utils/hash'

import { Account } from '@modules/accounts/entities/Account'
import { ICreateAccountDTO } from '@modules/accounts/dtos/ICreateAccount'
import { IAccountRepository } from '@modules/accounts/repositories/IAccountRepository'

export class CreateAccount {
	constructor(private accountRepository: IAccountRepository) {}

	public async execute({ confirmPassword, ...data }: ICreateAccountDTO) {
		if (confirmPassword !== data.password)
			throw new HttpError("The informed passwords don't match!", 400)

		const [salt, password] = this._hashSaltPassword(data.password)

		const account = new Account({
			...data,
			salt,
			password
		})

		await this.accountRepository.save(account)

		return account
	}

	private _hashSaltPassword(password: string) {
		const salt = v4()
		const hashPassword = getHashPassword(password, salt)

		return [salt, hashPassword]
	}
}
