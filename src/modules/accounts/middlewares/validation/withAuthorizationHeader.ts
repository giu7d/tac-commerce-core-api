import { Joi, celebrate, Segments } from 'celebrate'

export const withAuthorizationHeader = celebrate({
	[Segments.HEADERS]: Joi.object({
		authorization: Joi.string().required()
	}).unknown()
})
