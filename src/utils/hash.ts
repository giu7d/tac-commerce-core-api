import crypto from 'crypto'
import { v4 } from 'uuid'

export function getHashSaltPassword(password: string, salt: string) {
	const hashedPassword = crypto
		.createHmac('sha512', password + salt)
		.digest('hex')

	return hashedPassword
}

export function generateHashSaltPassword(password: string) {
	const salt = v4()
	const hashPassword = getHashSaltPassword(password, salt)

	return [salt, hashPassword]
}
