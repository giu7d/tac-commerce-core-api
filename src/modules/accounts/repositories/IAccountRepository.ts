import { Account } from '@modules/accounts/entities/Account'

export interface IAccountRepository {
	save(account: Account): Promise<void>
	modify(id: string, account: Partial<Omit<Account, 'id'>>): Promise<void>
	delete(id: string): Promise<void>
	findById(id: string): Promise<Account | undefined>
	findByEmail(email: string): Promise<Account | undefined>
}
