import { inject, injectable } from 'tsyringe'

import { IProductRepository } from '@modules/products/repositories/IProductRepository'
import { ProductNotFound } from '@utils/errors/ProductNotFound'

@injectable()
export class ShowProductUseCase {
	constructor(
		@inject('ProductRepository')
		private productRepository: IProductRepository
	) {}

	async execute(data: { id: string }) {
		const product = await this.productRepository.findById(data.id)

		if (!product) throw new ProductNotFound()

		return product
	}
}
