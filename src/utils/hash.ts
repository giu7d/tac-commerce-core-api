import crypto from 'crypto'

export function getHashPassword(password: string, salt: string) {
	const hashedPassword = crypto
		.createHmac('sha512', password + salt)
		.digest('hex')

	return hashedPassword
}
