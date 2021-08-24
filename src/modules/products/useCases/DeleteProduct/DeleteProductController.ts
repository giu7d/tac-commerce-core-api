import { container } from 'tsyringe'
import { Request, Response } from 'express'

import { DeleteProductUseCase } from './DeleteProductUseCase'

export class DeleteProductController {
	static async handle(request: Request, response: Response) {
		const { productId = '' } = request.params

		const useCase = container.resolve(DeleteProductUseCase)

		await useCase.execute({ id: productId })

		return response.status(200).send()
	}
}
