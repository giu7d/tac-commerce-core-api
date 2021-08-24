import { container } from 'tsyringe'
import { Request, Response } from 'express'

import { ShowAccountUseCase } from './ShowAccountUseCase'
import { ShowAccountView } from './ShowAccountView'

export class ShowAccountController {
	static async handle(request: Request, response: Response) {
		const { accountId = '' } = request.params

		const useCase = container.resolve(ShowAccountUseCase)

		const account = await useCase.execute({ id: accountId })

		const message = ShowAccountView.json(account)

		return response.status(200).json(message)
	}
}
