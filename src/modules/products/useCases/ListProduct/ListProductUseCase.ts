import { inject, injectable } from 'tsyringe'

import { IProductRepository } from '@modules/products/repositories/IProductRepository'

@injectable()
export class ListProductUseCase {
	constructor(
		@inject('ProductRepository')
		private productRepository: IProductRepository
	) {}

	async execute(data: { category?: string }) {
		return await this.productRepository.findAll(
			data.category ? { category: data.category } : undefined
		)
	}
}
