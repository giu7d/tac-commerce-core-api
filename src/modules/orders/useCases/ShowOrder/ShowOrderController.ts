import { container } from 'tsyringe'
import { Request, Response } from 'express'

import { ShowOrderUseCase } from './ShowOrderUseCase'
import { ShowOrderView } from './ShowOrderView'
import { getDataFromBearerToken } from '@utils/token'
import { isAdmin } from '@utils/permission'

export class ShowOrderController {
	static async handle(request: Request, response: Response) {
		const { orderId } = request.params
		const token = getDataFromBearerToken(request.headers.authorization)

		const useCase = container.resolve(ShowOrderUseCase)

		const order = await useCase.execute({
			id: orderId,
			accountId: token.id
		})

		const message = ShowOrderView.json(order)

		return response.status(200).send(message)
	}
}
