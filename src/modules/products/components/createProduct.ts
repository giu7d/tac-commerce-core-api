import { ICreateProductDTO } from '@modules/products/dtos/ICreateProduct'
import { Product } from '../entities/Product'
import { IProductRepository } from '../repository/IProductRepository'

export class CreateProduct {
	constructor(private productRepository: IProductRepository) {}

	async execute(data: ICreateProductDTO) {
		const product = new Product(data)

		await this.productRepository.save(product)

		return product
	}
}
