import { Request, Response } from 'express'

import { AuthenticateAccount } from '@modules/accounts/components/authenticateAccount'
import { CreateAccount } from '@modules/accounts/components/createAccount'
import { DeleteAccount } from '@modules/accounts/components/deleteAccount'
import { ModifyAccount } from '@modules/accounts/components/modifyAccount'
import { ShowAccount } from '@modules/accounts/components/showAccount'
import { IAuthAccountDTO } from '@modules/accounts/dtos/IAuthAccount'
import { ICreateAccountDTO } from '@modules/accounts/dtos/ICreateAccount'
import { IModifyAccountDTO } from '@modules/accounts/dtos/IModifyAccount'
import { AccountRepository } from '@modules/accounts/repositories/accountRepository'
import { ShowAccountView } from '@modules/accounts/views/showAccountView'
import { CreateAccountView } from './views/createAccountView'

export class AccountsController {
	public async create(request: Request<ICreateAccountDTO>, response: Response) {
		const accountRepository = new AccountRepository()
		const createAccountView = new CreateAccountView()
		const createAccount = new CreateAccount(accountRepository)

		const account = await createAccount.execute(request.body)
		const message = createAccountView.json(account)

		return response.status(201).json(message)
	}

	public async read(request: Request, response: Response) {
		const { accountId = '' } = request.params

		const accountRepository = new AccountRepository()
		const showAccountView = new ShowAccountView()
		const showAccount = new ShowAccount(accountRepository)

		const account = await showAccount.execute({ id: accountId })
		const message = showAccountView.json(account)

		return response.status(200).json(message)
	}

	public async update(
		request: Request<any, Omit<IModifyAccountDTO, 'id'>>,
		response: Response
	): Promise<Response> {
		const { accountId = '' } = request.params

		const accountRepository = new AccountRepository()
		const modifyAccount = new ModifyAccount(accountRepository)

		await modifyAccount.execute({ id: accountId, ...request.body })

		return response.status(200).send()
	}

	public async delete(
		request: Request<{ accountId: string }>,
		response: Response
	): Promise<Response> {
		const { accountId } = request.params

		const accountRepository = new AccountRepository()
		const deleteAccount = new DeleteAccount(accountRepository)

		await deleteAccount.execute({ id: accountId })

		return response.status(200).send()
	}

	public async authenticate(
		request: Request<IAuthAccountDTO>,
		response: Response
	) {
		const accountRepository = new AccountRepository()
		const authAccount = new AuthenticateAccount(accountRepository)

		const token = await authAccount.execute(request.body)

		return response.status(200).json({ token })
	}
}
