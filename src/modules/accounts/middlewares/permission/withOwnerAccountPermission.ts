import { Request, Response, NextFunction } from 'express'

import { AccountForbiddenPermission } from '@utils/errors/AccountForbiddenPermission'
import { getDataFromBearerToken } from '@utils/token'

export const withOwnerAccountPermission = (
	request: Request,
	_response: Response,
	next: NextFunction
) => {
	const { authorization = '' } = request.headers
	const { accountId = '' } = request.params

	const { id } = getDataFromBearerToken(authorization)

	if (id !== accountId) throw new AccountForbiddenPermission()

	return next()
}
