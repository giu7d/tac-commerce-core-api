import { Joi, celebrate, Segments } from 'celebrate'

import { IAuthenticateAccountDTO } from '@modules/accounts/useCases/AuthenticateAccount/IAuthenticateAccountDTO'

export const withValidAuthenticateAccount = celebrate<
	any,
	any,
	IAuthenticateAccountDTO
>({
	[Segments.BODY]: Joi.object<IAuthenticateAccountDTO>({
		email: Joi.string().email().required(),
		password: Joi.string().required()
	})
})
