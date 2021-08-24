import { container } from 'tsyringe'
import { AccountRepository } from './repositories/accountRepository'
import { IAccountRepository } from './repositories/IAccountRepository'

container.registerSingleton<IAccountRepository>(
	'AccountRepository',
	AccountRepository
)
