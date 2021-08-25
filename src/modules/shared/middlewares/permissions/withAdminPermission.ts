import { container } from 'tsyringe'
import { Request, Response, NextFunction } from 'express'

import { getDataFromBearerToken } from '@utils/token'
import { AccountNoAdminPermission } from '@utils/errors/AccountNoAdminPermission'
import { AdminPermissionService } from '@modules/accounts/services/AdminPermissionService'

export const withAdminPermission = async (
	request: Request,
	_response: Response,
	next: NextFunction
) => {
	const { authorization = '' } = request.headers
	const { id } = getDataFromBearerToken(authorization)

	const verifyAdminPermission = container.resolve(AdminPermissionService)
	const isAdmin = await verifyAdminPermission.execute({ id })

	if (!isAdmin) throw new AccountNoAdminPermission()

	return next()
}
