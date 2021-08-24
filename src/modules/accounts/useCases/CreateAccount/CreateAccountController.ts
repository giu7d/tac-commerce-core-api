import { container } from 'tsyringe'
import { Request, Response } from 'express'

import { CreateAccountUseCase } from './CreateAccountUseCase'
import { CreateAccountView } from './CreateAccountView'
import { ICreateAccountDTO } from './ICreateAccountDTO'

export class CreateAccountController {
	static async handle(
		request: Request<any, any, ICreateAccountDTO>,
		response: Response
	) {
		const useCase = container.resolve(CreateAccountUseCase)

		const account = await useCase.execute(request.body)

		const message = CreateAccountView.json(account)

		return response.status(201).json(message)
	}
}
