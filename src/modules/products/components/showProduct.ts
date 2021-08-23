import { IProductRepository } from '@modules/products/repository/IProductRepository'
import { ProductNotFound } from '@utils/errors/ProductNotFound'

export class ShowProduct {
	constructor(private productRepository: IProductRepository) {}

	async execute(data: { id: string }) {
		const product = await this.productRepository.findById(data.id)

		if (!product) throw new ProductNotFound()

		return product
	}
}
