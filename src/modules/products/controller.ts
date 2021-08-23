import { Request, Response } from 'express'
import { ICreateProductDTO } from '@modules/products/dtos/ICreateProduct'
import { IUpdateProductDTO } from '@modules/products/dtos/IUpdateProduct'
import { CreateProduct } from '@modules/products/components/createProduct'
import { DeleteProduct } from '@modules/products/components/deleteProduct'
import { ListProduct } from '@modules/products/components/listProduct'
import { ShowProduct } from '@modules/products/components/showProduct'
import { UpdateProduct } from '@modules/products/components/updateProduct'
import { ProductRepository } from '@modules/products/repository/productRepository'

export class ProductsController {
	public async create(
		request: Request<any, any, ICreateProductDTO>,
		response: Response
	) {
		const productRepository = new ProductRepository()
		const createProduct = new CreateProduct(productRepository)

		const product = await createProduct.execute(request.body)

		return response.status(201).json(product)
	}

	public async read(request: Request, response: Response) {
		const { productId = '' } = request.params

		const productRepository = new ProductRepository()
		const showProduct = new ShowProduct(productRepository)

		const product = await showProduct.execute({ id: productId })

		return response.status(200).json(product)
	}

	public async index(_request: Request, response: Response) {
		const productRepository = new ProductRepository()
		const listProduct = new ListProduct(productRepository)

		const products = await listProduct.execute()

		return response.status(200).json(products)
	}

	public async update(
		request: Request<any, any, Omit<IUpdateProductDTO, 'id'>>,
		response: Response
	) {
		const { productId = '' } = request.params

		const productRepository = new ProductRepository()
		const updateProduct = new UpdateProduct(productRepository)

		await updateProduct.execute({ id: productId, ...request.body })

		return response.status(200).send()
	}

	public async delete(request: Request, response: Response) {
		const { productId = '' } = request.params

		const productRepository = new ProductRepository()
		const deleteProduct = new DeleteProduct(productRepository)

		await deleteProduct.execute({ id: productId })

		return response.status(200).send()
	}
}
