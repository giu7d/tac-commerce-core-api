import { HttpError } from './httpError'

export class AccountWrongPassword extends HttpError {
	constructor() {
		super('The specified password is incorrect!', 403)
	}
}
