import jwt from 'jsonwebtoken'

import { HttpError } from '@utils/errors/httpError'
import { getHashPassword } from '@utils/hash'

import { IAuthAccountDTO } from '@modules/accounts/dtos/IAuthAccount'
import { IAccountRepository } from '@modules/accounts/repositories/IAccountRepository'
import { DBError } from '@utils/errors/dbError'

const { JWT_SECRET = '' } = process.env

export class AuthenticateAccount {
	constructor(private accountRepository: IAccountRepository) {}

	public async execute(data: IAuthAccountDTO) {
		const account = await this.accountRepository.findByEmail(data.email)

		if (!account) throw new DBError('The account does not exist!', 'Account')

		const password = getHashPassword(data.password, account.salt)

		if (password !== account.password)
			throw new HttpError('Wrong password!', 409)

		const token = jwt.sign({ email: data.email }, JWT_SECRET, {
			expiresIn: '5h'
		})

		return token
	}
}
