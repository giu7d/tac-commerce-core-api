import { container } from 'tsyringe'
import { Request, Response } from 'express'

import { LinkOrderUseCase } from './ListOrderUseCase'
import { LinkOrderView } from './ListOrderView'
import { IListOrderDTO } from './IListOrderDTO'

export class LinkOrderController {
	static async handle(
		request: Request<any, any, any, IListOrderDTO>,
		response: Response
	) {
		const { query } = request

		const useCase = container.resolve(LinkOrderUseCase)

		const orders = await useCase.execute(query)

		const message = LinkOrderView.json(orders)

		return response.status(200).send(message)
	}
}
