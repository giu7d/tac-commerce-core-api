import { Joi, celebrate, Segments } from 'celebrate'

export const withAccountIdParameter = celebrate({
	[Segments.PARAMS]: Joi.object({
		accountId: Joi.string().uuid().required()
	})
})
