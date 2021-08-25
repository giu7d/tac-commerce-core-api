import { HttpError } from './HttpError'

export class OrderForbiddenPermission extends HttpError {
	constructor() {
		super('You do not have permission to access this order information!', 403)
	}
}
