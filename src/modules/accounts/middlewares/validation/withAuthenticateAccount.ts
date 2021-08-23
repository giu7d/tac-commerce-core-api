import { Joi, celebrate, Segments } from 'celebrate'

import { IAuthAccountDTO } from '@modules/accounts/dtos/IAuthAccount'

export const withAuthenticateAccount = celebrate<any, any, IAuthAccountDTO>({
	[Segments.BODY]: Joi.object<IAuthAccountDTO>({
		email: Joi.string().email().required(),
		password: Joi.string().required()
	})
})
