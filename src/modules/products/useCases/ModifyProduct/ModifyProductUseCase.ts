import { inject, injectable } from 'tsyringe'

import { IModifyProductDTO } from '@modules/products/useCases/ModifyProduct/IModifyProductDTO'
import { IProductRepository } from '@modules/products/repositories/IProductRepository'

@injectable()
export class ModifyProductUseCase {
	constructor(
		@inject('ProductRepository')
		private productRepository: IProductRepository
	) {}

	async execute({ id, ...data }: IModifyProductDTO) {
		await this.productRepository.modify(id, data)
	}
}
