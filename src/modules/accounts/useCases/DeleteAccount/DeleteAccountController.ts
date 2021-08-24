import { container } from 'tsyringe'
import { Request, Response } from 'express'

import { DeleteAccountUseCase } from './DeleteAccountUseCase'

export class DeleteAccountController {
	static async handle(request: Request, response: Response) {
		const { accountId = '' } = request.params

		const useCase = container.resolve(DeleteAccountUseCase)

		await useCase.execute({ id: accountId })

		return response.status(200).send()
	}
}
