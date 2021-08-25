import { Joi, celebrate, Segments } from 'celebrate'

import { ICreateOrderDTO } from '@modules/orders/useCases/CreateOrder/ICreateOrderDTO'

export const withValidCreateOrder = celebrate<any, any, ICreateOrderDTO>({
	[Segments.BODY]: Joi.object<Omit<ICreateOrderDTO, 'accountId'>>({
		shipmentAddress: Joi.object({
			number: Joi.string().required(),
			street: Joi.string().required(),
			city: Joi.string().required(),
			additionalInformation: Joi.string().default(''),
			uf: Joi.string().length(2).required(),
			cep: Joi.string().required()
		}).required(),
		items: Joi.array()
			.items(
				Joi.object({
					quantity: Joi.number().integer().required(),
					productId: Joi.string().uuid().required()
				}).required()
			)
			.required()
	})
})
