import { inject, injectable } from 'tsyringe'
import { IAccountRepository } from '@modules/accounts/repositories/IAccountRepository'

@injectable()
export class DeleteAccountUseCase {
	constructor(
		@inject('AccountRepository')
		private accountRepository: IAccountRepository
	) {}

	public async execute(data: { id: string }) {
		await this.accountRepository.delete(data.id)
	}
}
