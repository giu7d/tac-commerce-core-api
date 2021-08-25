import { HttpError } from './HttpError'

export class AccountNoAdminPermission extends HttpError {
	constructor() {
		super('You do not have admin permission!', 403)
	}
}
