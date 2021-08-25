import { Order } from '@modules/orders/entities/Order'

export class CreateOrderView {
	static json(data: Order) {
		return {
			id: data.id,
			paymentStatus: data.paymentStatus,
			shipmentStatus: data.shipmentStatus,
			totalItems: data.items.length,
			totalPrice: data.totalPrice
		}
	}
}
