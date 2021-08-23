import { HttpError } from './httpError'

export class AccountNotFound extends HttpError {
	constructor() {
		super('Not able to find the specified account!', 404)
	}
}
