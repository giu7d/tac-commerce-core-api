import { container } from 'tsyringe'
import { Request, Response } from 'express'

import { ModifyProductUseCase } from './ModifyProductUseCase'
import { IModifyProductDTO } from './IModifyProductDTO'

export class ModifyProductController {
	static async handle(
		request: Request<any, any, Omit<IModifyProductDTO, 'id'>>,
		response: Response
	) {
		const { productId = '' } = request.params

		const useCase = container.resolve(ModifyProductUseCase)

		await useCase.execute({ id: productId, ...request.body })

		return response.status(200).send()
	}
}
