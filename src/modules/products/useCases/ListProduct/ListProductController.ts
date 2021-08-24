import { container } from 'tsyringe'
import { Request, Response } from 'express'

import { ListProductUseCase } from './ListProductUseCase'

export class ListProductController {
	static async handle(_request: Request, response: Response) {
		const useCase = container.resolve(ListProductUseCase)

		const products = await useCase.execute()

		return response.status(200).json(products)
	}
}
