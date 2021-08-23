import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { AccountForbiddenPermission } from '@utils/errors/AccountForbiddenPermission'

type AccountTokenPayload = {
	id: string
	email: string
}

export const withOwnerPermission = (
	request: Request,
	_response: Response,
	next: NextFunction
) => {
	const { authorization = '' } = request.headers
	const { accountId = '' } = request.params

	const [_bearer, token] = authorization.split(' ')

	const { id } = jwt.decode(token) as AccountTokenPayload

	if (id !== accountId) throw new AccountForbiddenPermission()

	return next()
}
