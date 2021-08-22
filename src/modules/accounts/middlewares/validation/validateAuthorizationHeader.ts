import { Joi, celebrate, Segments } from 'celebrate'

export const validateAuthorizationHeader = celebrate({
	[Segments.HEADERS]: Joi.object({
		authorization: Joi.string().required()
	}).unknown()
})
