import { HttpError } from './HttpError'

export class OrderNotFound extends HttpError {
	constructor() {
		super('Not able to find the specified order!', 404)
	}
}
