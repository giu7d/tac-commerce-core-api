import { HttpError } from './HttpError'

export class AccountNotFound extends HttpError {
	constructor() {
		super('Not able to find the specified account!', 404)
	}
}
