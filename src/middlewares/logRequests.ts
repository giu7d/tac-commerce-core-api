import { JsonWebTokenError } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { useColor } from '@utils/console'

export const handleApplicationRequests =
	() => (request: Request, _response: Response, next: NextFunction) => {
		console.log(
			`${useColor('green')(`REQUEST [${new Date().toLocaleString()}]:`)} ${
				request.originalUrl
			}`
		)

		return next()
	}
