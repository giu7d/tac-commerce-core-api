import { Joi, celebrate, Segments } from 'celebrate'

import { IListOrderDTO } from '@modules/orders/useCases/ListOrder/IListOrderDTO'

export const withListOrderQuery = celebrate<any, any, any, IListOrderDTO>({
	[Segments.QUERY]: Joi.object<IListOrderDTO>({
		paymentStatus: Joi.string().valid(
			'waiting-approval',
			'approved',
			'returned'
		),
		shipmentStatus: Joi.string().valid('ordered', 'shipped', 'received')
	})
})
