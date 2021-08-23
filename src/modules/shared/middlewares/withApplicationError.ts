import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { QueryFailedError } from 'typeorm'

import { HttpError } from '@utils/errors/HttpError'

export const withApplicationError = (
	error: Error,
	_request: Request,
	response: Response,
	_next: NextFunction
) => {
	if (error instanceof HttpError)
		return response.status(error.statusCode).json({
			status: error.statusCode,
			message: error.message
		})

	if (error instanceof TokenExpiredError)
		return response.status(403).json({
			status: 403,
			message: 'The authorization token is expired! Please, login again.'
		})

	if (error instanceof JsonWebTokenError)
		return response.status(403).json({
			status: 403,
			message: error.message
		})

	if (error instanceof QueryFailedError) {
		console.log({ error }, error.driverError.code)

		if (error.driverError.code === '23505') {
			return response.status(400).json({
				status: 400,
				message: error.driverError.detail
			})
		}
	}

	return response.status(500).json({
		status: 500,
		message: error.message,
		stack: error.stack
	})
}
