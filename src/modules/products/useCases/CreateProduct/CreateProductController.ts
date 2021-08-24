import { container } from 'tsyringe'
import { Request, Response } from 'express'

import { CreateProductUseCase } from './CreateProductUseCase'
import { ICreateProductDTO } from './ICreateProductDTO'

export class CreateProductController {
	static async handle(
		request: Request<any, any, ICreateProductDTO>,
		response: Response
	) {
		const useCase = container.resolve(CreateProductUseCase)

		const product = await useCase.execute(request.body)

		return response.status(201).json(product)
	}
}
