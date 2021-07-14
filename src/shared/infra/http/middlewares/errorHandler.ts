import { HttpError } from '@shared/errors/HttpError'
import { Request, Response, NextFunction } from 'express'

export const errorHandler = (
	error: Error,
	_request: Request,
	response: Response,
	_next: NextFunction
) => {
	console.log(`[123] ${error.message}`)

	if (error instanceof HttpError) {
		return response.status(error.statusCode).json({
			status: error.statusCode,
			message: error.message
		})
	}

	return response.status(500).json({
		status: 500,
		message: 'Internal server error.'
	})
}
