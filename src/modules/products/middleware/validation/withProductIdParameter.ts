import { Joi, celebrate, Segments } from 'celebrate'

export const withProductIdParameter = celebrate({
	[Segments.PARAMS]: Joi.object({
		productId: Joi.string().uuid().required()
	})
})
