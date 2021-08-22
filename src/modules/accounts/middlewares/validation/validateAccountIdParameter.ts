import { Joi, celebrate, Segments } from 'celebrate'

export const validateAccountIdParameter = celebrate({
	[Segments.PARAMS]: Joi.object({
		accountId: Joi.string().uuid().required()
	})
})
