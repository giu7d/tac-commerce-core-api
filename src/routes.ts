import { Router } from 'express'

import accountsRouter from '@modules/accounts/routes'

const routes = Router()

routes.use('/accounts', accountsRouter)

export { routes }
