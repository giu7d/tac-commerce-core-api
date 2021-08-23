import { getRepository, Repository } from 'typeorm'
import { Product } from '@modules/products/entities/Product'
import { IProductRepository } from './IProductRepository'

export class ProductRepository implements IProductRepository {
	repository: Repository<Product>

	constructor() {
		this.repository = getRepository(Product)
	}
	async save(product: Product) {
		await this.repository.save(product)
	}

	async modify(id: string, product: Partial<Omit<Product, 'id'>>) {
		await this.repository.update({ id }, product)
	}

	async delete(id: string) {
		await this.repository.softDelete({ id })
	}

	async findById(id: string) {
		return await this.repository.findOne({ id })
	}

	async findAll() {
		return await this.repository.find()
	}
}
