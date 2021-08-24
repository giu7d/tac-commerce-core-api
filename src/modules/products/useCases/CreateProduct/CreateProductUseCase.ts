import { inject, injectable } from 'tsyringe'

import { Product } from '@modules/products/entities/Product'
import { IProductRepository } from '@modules/products/repositories/IProductRepository'

import { ICreateProductDTO } from './ICreateProductDTO'

@injectable()
export class CreateProductUseCase {
	constructor(
		@inject('ProductRepository')
		private productRepository: IProductRepository
	) {}

	async execute(data: ICreateProductDTO) {
		const product = new Product(data)

		await this.productRepository.save(product)

		return product
	}
}
