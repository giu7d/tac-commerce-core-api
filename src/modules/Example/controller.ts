import { Request, Response } from 'express'

export class ExampleController {
	public async create(request: Request, response: Response): Promise<Response> {
		return response.status(201).send()
	}

	public async index(request: Request, response: Response): Promise<Response> {
		return response.status(200).json({
			message: 'Hello World'
		})
	}
}
