import { container } from 'tsyringe'
import { Request, Response } from 'express'

import { ShowProductUseCase } from './ShowProductUseCase'

export class ShowProductController {
	static async handle(request: Request, response: Response) {
		const { productId = '' } = request.params

		const useCase = container.resolve(ShowProductUseCase)

		const product = await useCase.execute({ id: productId })

		return response.status(200).json(product)
	}
}
