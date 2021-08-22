import { Joi, celebrate, Segments } from 'celebrate'

import { ICreateAccountDTO } from '@modules/accounts/dtos/ICreateAccount'

export const validateCreateAccount = celebrate<ICreateAccountDTO>({
	[Segments.BODY]: Joi.object<ICreateAccountDTO>({
		firstName: Joi.string().required(),
		lastName: Joi.string().required(),
		email: Joi.string().email().required(),
		password: Joi.string().required(),
		confirmPassword: Joi.string().required()
	})
})
