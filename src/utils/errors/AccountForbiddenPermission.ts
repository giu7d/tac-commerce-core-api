import { HttpError } from './httpError'

export class AccountForbiddenPermission extends HttpError {
	constructor() {
		super('You do not have permission to access this account information!', 403)
	}
}
