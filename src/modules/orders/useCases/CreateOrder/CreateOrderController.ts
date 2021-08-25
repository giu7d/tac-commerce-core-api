import { container } from 'tsyringe'
import { Request, Response } from 'express'

import { ICreateOrderDTO } from './ICreateOrderDTO'
import { CreateOrderUseCase } from './CreateOrderUseCase'
import { getDataFromBearerToken } from '@utils/token'

export class CreateOrderController {
	static async handle(
		request: Request<any, any, Omit<ICreateOrderDTO, 'accountId'>>,
		response: Response
	) {
		const { id: accountId } = getDataFromBearerToken(
			request.headers.authorization || ''
		)

		const useCase = container.resolve(CreateOrderUseCase)

		const { id } = await useCase.execute({ ...request.body, accountId })

		return response.status(201).json({ id })
	}
}
