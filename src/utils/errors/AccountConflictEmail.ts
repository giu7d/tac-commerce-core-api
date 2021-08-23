import { HttpError } from './httpError'

export class AccountConflictEmail extends HttpError {
	constructor() {
		super('This email has already been taken!', 409)
	}
}
