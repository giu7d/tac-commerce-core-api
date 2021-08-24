import { Joi, celebrate, Segments } from 'celebrate'

import { ICreateProductDTO } from '@modules/products/useCases/CreateProduct/ICreateProductDTO'

export const withValidCreateProduct = celebrate<any, any, ICreateProductDTO>({
	[Segments.BODY]: Joi.object<ICreateProductDTO>({
		name: Joi.string().required(),
		category: Joi.string().required(),
		quantity: Joi.number().min(0).default(0),
		unitPrice: Joi.number().min(0).default(0),
		additionalInformation: Joi.object().unknown()
	})
})
