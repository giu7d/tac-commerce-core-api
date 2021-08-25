import { container } from 'tsyringe'
import { Request, Response } from 'express'

import { LinkOrderUseCase } from './ListOrderUseCase'
import { ListOrderView } from './ListOrderView'
import { IListOrderDTO } from './IListOrderDTO'
import { getDataFromBearerToken } from '@utils/token'
import { isAdmin } from '@utils/permission'

export class LinkOrderController {
	static async handle(
		request: Request<any, any, any, Omit<IListOrderDTO, 'accountId'>>,
		response: Response
	) {
		const { query } = request

		const token = getDataFromBearerToken(request.headers.authorization)

		const useCase = container.resolve(LinkOrderUseCase)

		const orders = await useCase.execute({
			...query,
			accountId: token.id
		})

		const message = ListOrderView.json(orders)

		return response.status(200).send(message)
	}
}
