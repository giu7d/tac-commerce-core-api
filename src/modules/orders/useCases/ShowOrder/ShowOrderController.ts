import { container } from 'tsyringe'
import { Request, Response } from 'express'

import { ShowOrderUseCase } from './ShowOrderUseCase'
import { ShowOrderView } from './ShowOrderView'

export class ShowOrderController {
	static async handle(request: Request, response: Response) {
		const { orderId = '' } = request.params

		console.log(orderId)

		const useCase = container.resolve(ShowOrderUseCase)

		const order = await useCase.execute({ id: orderId })

		const message = ShowOrderView.json(order)

		return response.status(200).send(message)
	}
}
