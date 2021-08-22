import { JsonWebTokenError } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

import { HttpError } from '@utils/errors/httpError'
import { DBError } from '@utils/errors/dbError'
import { useColor } from '@utils/console'

export const handleApplicationError =
	() =>
	(
		error: Error,
		_request: Request,
		response: Response,
		_next: NextFunction
	) => {
		console.log(
			`${useColor('purple')(`ERROR [${new Date().toLocaleString()}]:`)} ${
				error.message
			}`
		)

		if (error instanceof DBError)
			return response.status(404).json({
				status: 404,
				message: error.message,
				entity: error.entity
			})

		if (error instanceof JsonWebTokenError)
			return response.status(409).json({
				status: 409,
				message: error.message
			})

		if (error instanceof HttpError)
			return response.status(error.statusCode).json({
				status: error.statusCode,
				message: error.message
			})

		return response.status(500).json({
			status: 500,
			message: error.message
		})
	}
