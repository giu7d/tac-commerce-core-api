import { Order } from '@modules/orders/entities/Order'

export class ListOrderView {
	static json(data: Order[]) {
		return data.map(item => ({
			id: item.id,
			shipmentAddress: item.shipmentAddress,
			paymentStatus: item.paymentStatus,
			shipmentStatus: item.shipmentStatus,
			account: {
				id: item.account.id,
				email: item.account.email,
				firstName: item.account.firstName,
				lastName: item.account.lastName
			},
			items: item.items.map(item => ({
				productId: item.product.id,
				product: item.product.name,
				quantity: item.quantity,
				totalPrice: item.totalPrice,
				unitPrice: item.unitPrice
			})),
			totalPrice: item.totalPrice
		}))
	}
}
