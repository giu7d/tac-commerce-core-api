import { inject, injectable } from 'tsyringe'

import { Order } from '@modules/orders/entities/Order'
import { OrderItem } from '@modules/orders/entities/OrderItem'
import { IOrderRepository } from '@modules/orders/repositories/IOrderRepository'
import { IAccountRepository } from '@modules/accounts/repositories/IAccountRepository'
import { IProductRepository } from '@modules/products/repositories/IProductRepository'
import { AccountNotFound } from '@utils/errors/AccountNotFound'
import { ProductNotFound } from '@utils/errors/ProductNotFound'

import { ICreateOrderDTO } from './ICreateOrderDTO'
import { Product } from '@modules/products/entities/Product'

@injectable()
export class CreateOrderUseCase {
	constructor(
		@inject('OrderRepository')
		private orderRepository: IOrderRepository,
		@inject('AccountRepository')
		private accountRepository: IAccountRepository,
		@inject('ProductRepository')
		private productRepository: IProductRepository
	) {}

	async execute({ shipmentAddress, ...data }: ICreateOrderDTO) {
		const account = await this.accountRepository.findById(data.accountId)

		if (!account) throw new AccountNotFound()

		const order = new Order({
			account,
			shipmentAddress,
			paymentStatus: 'waiting-approval',
			shipmentStatus: 'ordered',
			totalPrice: 0,
			items: []
		})

		order.items = await Promise.all(
			data.items.map(item =>
				this._mapItemToOrderItem(item.productId, item.quantity, order)
			)
		)

		order.totalPrice = this._calculateTotalPrice(order.items)

		await this.orderRepository.save(order)

		return order
	}

	private _calculateTotalPrice(items: Array<OrderItem>) {
		return items.reduce((acc, current) => current.totalPrice + acc, 0)
	}

	private async _mapItemToOrderItem(
		productId: string,
		quantity: number,
		order: Order
	) {
		const product = await this.productRepository.findById(productId)

		if (!product) throw new ProductNotFound()

		await this._withdrawProductsFromStock(product, quantity)

		return new OrderItem({
			order,
			product,
			quantity,
			totalPrice: product.unitPrice * quantity,
			unitPrice: product.unitPrice
		})
	}

	private async _withdrawProductsFromStock(
		product: Product,
		consumedQuantity: number
	) {
		const quantity = product.quantity - consumedQuantity

		await this.productRepository.modify(product.id, {
			quantity
		})
	}
}
