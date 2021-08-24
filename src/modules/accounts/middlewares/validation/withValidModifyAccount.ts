import { Joi, celebrate, Segments } from 'celebrate'

import { IModifyAccountDTO } from '@modules/accounts/useCases/ModifyAccount/IModifyAccountDTO'

export const withValidModifyAccount = celebrate<
	any,
	any,
	Omit<IModifyAccountDTO, 'id'>
>({
	[Segments.BODY]: Joi.object<Omit<IModifyAccountDTO, 'id'>>({
		firstName: Joi.string(),
		lastName: Joi.string(),
		email: Joi.string().email(),
		password: Joi.string(),
		currentPassword: Joi.string()
	})
})
