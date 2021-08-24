import jwt from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import { getHashSaltPassword } from '@utils/hash'
import { IAccountRepository } from '@modules/accounts/repositories/IAccountRepository'
import { AccountNotFound } from '@utils/errors/AccountNotFound'
import { AccountWrongPassword } from '@utils/errors/AccountWrongPassword'

import { IAuthenticateAccountDTO } from './IAuthenticateAccountDTO'

const { JWT_SECRET = '' } = process.env

@injectable()
export class AuthenticateAccountUseCase {
	constructor(
		@inject('AccountRepository')
		private accountRepository: IAccountRepository
	) {}

	public async execute(data: IAuthenticateAccountDTO) {
		const account = await this.accountRepository.findByEmail(data.email)

		if (!account) throw new AccountNotFound()

		const hashSaltPassword = getHashSaltPassword(data.password, account.salt)

		if (hashSaltPassword !== account.password) throw new AccountWrongPassword()

		const token = this._signToken(account.id, account.email)

		return token
	}

	private _signToken(id: string, email: string, expiresIn = '5h') {
		return jwt.sign({ id, email }, JWT_SECRET, {
			expiresIn
		})
	}
}
