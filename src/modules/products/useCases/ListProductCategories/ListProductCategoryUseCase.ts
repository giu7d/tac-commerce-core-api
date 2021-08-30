import { inject, injectable } from 'tsyringe'

import { IProductRepository } from '@modules/products/repositories/IProductRepository'

@injectable()
export class ListProductCategoryUseCase {
	constructor(
		@inject('ProductRepository')
		private productRepository: IProductRepository
	) {}

	async execute() {
		const products = await this.productRepository.findAll()
		const categories = products.map(item => item.category)
		return Array.from(new Set(categories))
	}
}
