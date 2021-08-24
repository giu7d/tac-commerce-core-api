import { inject, injectable } from 'tsyringe'

import { Account } from '@modules/accounts/entities/Account'
import { IAccountRepository } from '@modules/accounts/repositories/IAccountRepository'
import { AccountConflictEmail } from '@utils/errors/AccountConflictEmail'
import { AccountNotFound } from '@utils/errors/AccountNotFound'
import { AccountWrongPassword } from '@utils/errors/AccountWrongPassword'
import { generateHashSaltPassword, getHashSaltPassword } from '@utils/hash'

import { IModifyAccountDTO } from './IModifyAccountDTO'

@injectable()
export class ModifyAccountUseCase {
	constructor(
		@inject('AccountRepository')
		private accountRepository: IAccountRepository
	) {}

	public async execute({
		id,
		currentPassword,
		password,
		...data
	}: IModifyAccountDTO) {
		if (data.email) await this._verifyEmailExistence(data.email)

		if (currentPassword && password) {
			const partialPasswordData = await this._updatePasswordAndData(
				id,
				password,
				currentPassword
			)
			return await this.accountRepository.modify(id, {
				...data,
				...partialPasswordData
			})
		}

		return await this.accountRepository.modify(id, data)
	}

	private async _updatePasswordAndData(
		id: string,
		newPassword: string,
		currentPassword: string
	): Promise<Partial<Account>> {
		await this._verifyPassword(id, currentPassword)

		const [salt, password] = generateHashSaltPassword(newPassword)

		return {
			salt,
			password
		}
	}

	private async _verifyEmailExistence(email: string) {
		const account = await this.accountRepository.findByEmail(email)

		if (account) throw new AccountConflictEmail()
	}

	private async _verifyPassword(id: string, password: string) {
		const account = await this.accountRepository.findById(id)

		if (!account) throw new AccountNotFound()

		const hashSaltPassword = getHashSaltPassword(password, account.salt)

		if (account.password !== hashSaltPassword) throw new AccountWrongPassword()
	}
}
