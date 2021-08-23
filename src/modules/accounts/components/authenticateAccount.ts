import jwt from 'jsonwebtoken'

import { getHashSaltPassword } from '@utils/hash'

import { IAuthAccountDTO } from '@modules/accounts/dtos/IAuthAccount'
import { IAccountRepository } from '@modules/accounts/repositories/IAccountRepository'
import { AccountNotFound } from '@utils/errors/AccountNotFound'
import { AccountWrongPassword } from '@utils/errors/AccountWrongPassword'

const { JWT_SECRET = '' } = process.env

export class AuthenticateAccount {
	constructor(private accountRepository: IAccountRepository) {}

	public async execute(data: IAuthAccountDTO) {
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
