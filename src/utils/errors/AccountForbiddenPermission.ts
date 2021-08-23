import { HttpError } from './HttpError'

export class AccountForbiddenPermission extends HttpError {
	constructor() {
		super('You do not have permission to access this account information!', 403)
	}
}
