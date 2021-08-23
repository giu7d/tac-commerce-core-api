import { Joi, celebrate, Segments } from 'celebrate'

import { IUpdateProductDTO } from '@modules/products/dtos/IUpdateProduct'

export const withValidModifyProduct = celebrate<Omit<IUpdateProductDTO, 'id'>>({
	[Segments.BODY]: Joi.object<Omit<IUpdateProductDTO, 'id'>>({
		name: Joi.string(),
		category: Joi.string(),
		quantity: Joi.number().min(0),
		unitPrice: Joi.number().min(0),
		additionalInformation: Joi.object().unknown()
	})
})
