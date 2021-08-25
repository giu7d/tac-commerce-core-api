import { container } from 'tsyringe'
import { Request, Response } from 'express'

import { ModifyOrderUseCase } from './ModifyOrderUseCase'
import { IModifyOrderDTO } from './IModifyOrderDTO'

export class ModifyOrderController {
	static async handle(
		request: Request<any, any, Omit<IModifyOrderDTO, 'id'>>,
		response: Response
	) {
		const { orderId = '' } = request.params

		const useCase = container.resolve(ModifyOrderUseCase)

		await useCase.execute({ ...request.body, id: orderId })

		return response.status(200).send()
	}
}
