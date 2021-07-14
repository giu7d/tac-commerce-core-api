import { Router } from 'express'
import { ExampleController } from './controller'

const exampleController = new ExampleController()

const exampleRouter = Router()

exampleRouter.post('/', exampleController.create)
exampleRouter.get('/', exampleController.index)

export { exampleRouter }
