import { IProductRepository } from '@modules/products/repository/IProductRepository'

export class ListProduct {
	constructor(private productRepository: IProductRepository) {}

	async execute() {
		return await this.productRepository.findAll()
	}
}
