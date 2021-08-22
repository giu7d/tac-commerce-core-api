import { IDeleteAccountDTO } from '@modules/accounts/dtos/IDeleteAccount'
import { IAccountRepository } from '@modules/accounts/repositories/IAccountRepository'

export class DeleteAccount {
	constructor(private accountRepository: IAccountRepository) {}

	public async execute(data: IDeleteAccountDTO) {
		await this.accountRepository.delete(data.id)
	}
}
