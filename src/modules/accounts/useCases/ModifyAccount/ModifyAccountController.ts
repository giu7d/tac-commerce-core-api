import { container } from 'tsyringe'
import { Request, Response } from 'express'

import { ModifyAccountUseCase } from './ModifyAccountUseCase'
import { IModifyAccountDTO } from './IModifyAccountDTO'

export class ModifyAccountController {
	static async handle(
		request: Request<any, any, Omit<IModifyAccountDTO, 'id'>>,
		response: Response
	) {
		const { accountId = '' } = request.params

		const useCase = container.resolve(ModifyAccountUseCase)

		await useCase.execute({ id: accountId, ...request.body })

		return response.status(200).send()
	}
}
