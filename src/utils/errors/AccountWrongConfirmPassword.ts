import { HttpError } from './httpError'

export class AccountWrongConfirmPassword extends HttpError {
	constructor() {
		super(
			'The specified password do not match with the password confirmation!',
			400
		)
	}
}
