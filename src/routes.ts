import { Router } from 'express'

import accountsRouter from '@modules/accounts/routes'
import productsRouter from '@modules/products/routes'
import ordersRouter from '@modules/orders/routes'

const routes = Router()

routes.use('/accounts', accountsRouter)
routes.use('/products', productsRouter)
routes.use('/orders', ordersRouter)

export { routes }
