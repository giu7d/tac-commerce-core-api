import { Order } from '@modules/orders/entities/Order'

export class ShowOrderView {
	static json(data: Order) {
		return {
			id: data.id,
			shipmentAddress: data.shipmentAddress,
			paymentStatus: data.paymentStatus,
			shipmentStatus: data.shipmentStatus,
			account: {
				id: data.account.id,
				email: data.account.email,
				firstName: data.account.firstName,
				lastName: data.account.lastName
			},
			items: data.items.map(item => ({
				productId: item.product.id,
				product: item.product.name,
				quantity: item.quantity,
				totalPrice: item.totalPrice,
				unitPrice: item.unitPrice
			})),
			totalPrice: data.totalPrice
		}
	}
}
