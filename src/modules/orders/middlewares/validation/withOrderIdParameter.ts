import { Joi, celebrate, Segments } from 'celebrate'

export const withOrderIdParameter = celebrate({
	[Segments.PARAMS]: Joi.object({
		orderId: Joi.string().uuid().required()
	})
})
