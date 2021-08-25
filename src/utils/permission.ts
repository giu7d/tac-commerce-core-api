import { Request } from 'express'

export const PERMISSION_TYPE_HEADER = 'application-permission-type'

export const PERMISSION_TYPES = {
	admin: 'admin',
	owner: 'owner',
	guest: 'guest'
}

export const isAdmin = (request: Request) =>
	request.headers[PERMISSION_TYPE_HEADER] === PERMISSION_TYPES.admin
