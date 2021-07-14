import request from 'supertest'

import app from '@shared/infra/http/server'

describe('Test', () => {
	it('page should return hello world', async () => {
		const res = await request(app).get('/')

		expect(res.statusCode).toEqual(200)
		expect(res.body.message).toEqual('Hello World')
	})
})
