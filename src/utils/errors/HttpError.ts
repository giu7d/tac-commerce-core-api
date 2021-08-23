export class HttpError {
	constructor(public message: string, public statusCode = 500) {}
}
