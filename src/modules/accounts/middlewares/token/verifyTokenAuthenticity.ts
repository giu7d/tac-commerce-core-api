import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

const { JWT_SECRET = '' } = process.env

export const verifyTokenAuthenticity = (
	request: Request,
	_response: Response,
	next: NextFunction
) => {
	const { authorization = '' } = request.headers

	const [_bearer, token] = authorization.split(' ')

	jwt.verify(token, JWT_SECRET)

	return next()
}
