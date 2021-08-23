import { Request, Response, NextFunction } from 'express'
import { useColor } from '@utils/console'

const _nowTimestamp = () => new Date().toLocaleString()
const _useSuccess = useColor('green')
const _useError = useColor('purple')

const _logMessage = (status: number, method: string, url: string) => {
	const statusCode =
		status === 200 || status === 201
			? _useSuccess(`${status} [${_nowTimestamp()}]`)
			: _useError(`${status} [${_nowTimestamp()}]`)

	console.log(`${statusCode}: ${method} ${url}`)
}

export const withResponseLogger = (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	response.on('finish', () =>
		_logMessage(response.statusCode, request.method, request.originalUrl)
	)

	return next()
}
