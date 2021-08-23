import { Product } from '@modules/products/entities/Product'

export interface IProductRepository {
	save(product: Product): Promise<void>
	modify(id: string, product: Partial<Omit<Product, 'id'>>): Promise<void>
	delete(id: string): Promise<void>
	findById(id: string): Promise<Product | undefined>
	findAll(): Promise<Product[]>
}
