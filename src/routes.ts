import { Router } from 'express'

import accountsRouter from '@modules/accounts/routes'
import productsRouter from '@modules/products/routes'

const routes = Router()

routes.use('/accounts', accountsRouter)
routes.use('/products', productsRouter)

export { routes }
