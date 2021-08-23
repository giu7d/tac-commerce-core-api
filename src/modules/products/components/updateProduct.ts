import { IUpdateProductDTO } from '@modules/products/dtos/IUpdateProduct'
import { IProductRepository } from '@modules/products/repository/IProductRepository'

export class UpdateProduct {
	constructor(private productRepository: IProductRepository) {}

	async execute({ id, ...data }: IUpdateProductDTO) {
		await this.productRepository.modify(id, data)
	}
}
