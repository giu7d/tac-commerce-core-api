import { Joi, celebrate, Segments } from 'celebrate'

import { IModifyProductDTO } from '@modules/products/useCases/ModifyProduct/IModifyProductDTO'

export const withValidModifyProduct = celebrate<Omit<IModifyProductDTO, 'id'>>({
	[Segments.BODY]: Joi.object<Omit<IModifyProductDTO, 'id'>>({
		name: Joi.string(),
		category: Joi.string(),
		quantity: Joi.number().min(0),
		unitPrice: Joi.number().min(0),
		additionalInformation: Joi.object().unknown()
	})
})
