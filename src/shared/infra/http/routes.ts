import { exampleRouter } from '@modules/Example/routes'
import { Router } from 'express'

const routes = Router()

routes.use('/', exampleRouter)

export { routes }
