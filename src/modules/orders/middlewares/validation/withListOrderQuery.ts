import { Joi, celebrate, Segments } from 'celebrate'

import { IListOrderDTO } from '@modules/orders/useCases/ListOrder/IListOrderDTO'

export const withListOrderQuery = celebrate<
	any,
	any,
	any,
	Omit<IListOrderDTO, 'accountId'>
>({
	[Segments.QUERY]: Joi.object<Omit<IListOrderDTO, 'accountId'>>({
		paymentStatus: Joi.string().valid(
			'waiting-approval',
			'approved',
			'returned'
		),
		shipmentStatus: Joi.string().valid('ordered', 'shipped', 'received')
	})
})
