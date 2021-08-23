import { HttpError } from './HttpError'

export class ProductNotFound extends HttpError {
	constructor() {
		super('Not able to find the specified product!', 404)
	}
}
