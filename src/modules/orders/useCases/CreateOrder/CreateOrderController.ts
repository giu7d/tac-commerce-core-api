import { container } from 'tsyringe'
import { Request, Response } from 'express'

import { ICreateOrderDTO } from './ICreateOrderDTO'
import { CreateOrderUseCase } from './CreateOrderUseCase'
import { getDataFromBearerToken } from '@utils/token'
import { CreateOrderView } from './CreateOrderView'

export class CreateOrderController {
	static async handle(
		request: Request<any, any, Omit<ICreateOrderDTO, 'accountId'>>,
		response: Response
	) {
		const { id: accountId } = getDataFromBearerToken(
			request.headers.authorization
		)

		const useCase = container.resolve(CreateOrderUseCase)

		const order = await useCase.execute({ ...request.body, accountId })
		const message = CreateOrderView.json(order)

		return response.status(201).json(message)
	}
}
