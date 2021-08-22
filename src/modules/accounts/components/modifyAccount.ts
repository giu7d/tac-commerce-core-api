import { IModifyAccountDTO } from '@modules/accounts/dtos/IModifyAccount'
import { IAccountRepository } from '@modules/accounts/repositories/IAccountRepository'
import { DBError } from '@utils/errors/dbError'
import { HttpError } from '@utils/errors/httpError'
import { getHashPassword } from '@utils/hash'
import { v4 } from 'uuid'
import { Account } from '../entities/Account'

export class ModifyAccount {
	constructor(private accountRepository: IAccountRepository) {}

	public async execute({
		id,
		currentPassword,
		password,
		...data
	}: IModifyAccountDTO) {
		if (data.email) await this._verifyEmailExistence(data.email)

		if (!currentPassword || !password)
			return await this.accountRepository.modify(id, data)

		await this._verifyCurrentPassword(id, currentPassword)

		const [salt, newPassword] = this._hashSaltNewPassword(password)

		await this.accountRepository.modify(id, {
			...data,
			salt,
			password: newPassword
		})
	}

	private async _verifyEmailExistence(email: string) {
		const account = await this.accountRepository.findByEmail(email)

		if (account) throw new DBError('This email is already in use!', 'Account')
	}

	private _hashSaltNewPassword(password: string) {
		const salt = v4()
		const newPassword = getHashPassword(password, salt)

		return [salt, newPassword]
	}

	private async _verifyCurrentPassword(id: string, currentPassword: string) {
		const account = await this.accountRepository.findById(id)

		if (!account) throw new DBError('The account does not exist!', 'Account')

		const hashedPassword = getHashPassword(currentPassword, account.salt)

		if (account.password !== hashedPassword)
			throw new HttpError('Wrong password!', 409)
	}
}
