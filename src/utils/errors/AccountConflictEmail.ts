import { HttpError } from './HttpError'

export class AccountConflictEmail extends HttpError {
	constructor() {
		super('This email has already been taken!', 409)
	}
}
