import jwt from 'jsonwebtoken'

const { JWT_SECRET = '' } = process.env

export type AccountTokenPayload = {
	id: string
	email: string
}

export function getDataFromBearerToken(authorization: string) {
	const [_bearer, token] = authorization.split(' ')

	const data = jwt.verify(token, JWT_SECRET) as AccountTokenPayload

	return data
}
