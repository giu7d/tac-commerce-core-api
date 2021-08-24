import { getRepository, Repository } from 'typeorm'
import { Account } from '@modules/accounts/entities/Account'
import { IAccountRepository } from './IAccountRepository'

export class AccountRepositoryTypeORM implements IAccountRepository {
	repository: Repository<Account>

	constructor() {
		this.repository = getRepository(Account)
	}

	async save(account: Account) {
		await this.repository.save(account)
	}

	async modify(id: string, account: Partial<Omit<Account, 'id'>>) {
		await this.repository.update({ id }, account)
	}

	async delete(id: string) {
		await this.repository.softDelete({ id })
	}

	async findById(id: string) {
		return await this.repository.findOne({ id })
	}

	async findByEmail(email: string) {
		return await this.repository.findOne({ email })
	}
}
