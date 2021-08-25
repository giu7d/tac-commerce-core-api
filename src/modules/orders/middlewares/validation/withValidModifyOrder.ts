import { Joi, celebrate, Segments } from 'celebrate'

import { IModifyOrderDTO } from '@modules/orders/useCases/ModifyOrder/IModifyOrderDTO'

export const withValidModifyOrder = celebrate<any, any, IModifyOrderDTO>({
	[Segments.BODY]: Joi.object<Omit<IModifyOrderDTO, 'id'>>({
		shipmentStatus: Joi.string()
			.valid('ordered', 'shipped', 'received')
			.required()
	})
})
