import { inject, injectable } from 'tsyringe'

import { IProductRepository } from '@modules/products/repositories/IProductRepository'

@injectable()
export class DeleteProductUseCase {
	constructor(
		@inject('ProductRepository')
		private productRepository: IProductRepository
	) {}

	async execute(data: { id: string }) {
		await this.productRepository.delete(data.id)
	}
}
