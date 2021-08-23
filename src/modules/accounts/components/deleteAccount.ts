import { IAccountRepository } from '@modules/accounts/repositories/IAccountRepository'

export class DeleteAccount {
	constructor(private accountRepository: IAccountRepository) {}

	public async execute(data: { id: string }) {
		await this.accountRepository.delete(data.id)
	}
}
