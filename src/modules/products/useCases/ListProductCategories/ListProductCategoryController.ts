import { container } from 'tsyringe'
import { Request, Response } from 'express'

import { ListProductCategoryUseCase } from './ListProductCategoryUseCase'

export class ListProductCategoryController {
	static async handle(_request: Request, response: Response) {
		const useCase = container.resolve(ListProductCategoryUseCase)

		const products = await useCase.execute()

		return response.status(200).json(products)
	}
}
