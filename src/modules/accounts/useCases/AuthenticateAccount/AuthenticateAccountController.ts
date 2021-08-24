import { Request, Response, NextFunction } from 'express'
import { container } from 'tsyringe'
import { AuthenticateAccountUseCase } from './AuthenticateAccountUseCase'

export class AuthenticateAccountController {
	static async handle(request: Request, response: Response) {
		const useCase = container.resolve(AuthenticateAccountUseCase)

		const token = await useCase.execute(request.body)

		return response.status(200).json({ token })
	}
}
