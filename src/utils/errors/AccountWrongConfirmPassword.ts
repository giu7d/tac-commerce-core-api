import { HttpError } from './HttpError'

export class AccountWrongConfirmPassword extends HttpError {
	constructor() {
		super(
			'The specified password do not match with the password confirmation!',
			400
		)
	}
}
