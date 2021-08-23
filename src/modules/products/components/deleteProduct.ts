import { IProductRepository } from '@modules/products/repository/IProductRepository'

export class DeleteProduct {
	constructor(private productRepository: IProductRepository) {}

	async execute(data: { id: string }) {
		await this.productRepository.delete(data.id)
	}
}
