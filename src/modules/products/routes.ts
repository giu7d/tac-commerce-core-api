import { Router } from 'express'

import { withValidToken } from '@modules/shared/middlewares/token/withValidToken'
import { withAuthorizationHeader } from '@modules/shared/middlewares/token/withAuthorizationHeader'
import { ProductsController } from '@modules/products/controller'
import { withValidCreateProduct } from '@modules/products/middleware/validation/withValidCreateProduct'
import { withProductIdParameter } from '@modules/products/middleware/validation/withProductIdParameter'
import { withValidModifyProduct } from '@modules/products/middleware/validation/withValidModifyProduct'

const controller = new ProductsController()

const router = Router()

router.post(
	'/',
	withAuthorizationHeader,
	withValidToken,
	withValidCreateProduct,
	controller.create
)

router.get('/', controller.index)

router.get('/:productId', withProductIdParameter, controller.read)

router.put(
	'/:productId',
	withProductIdParameter,
	withAuthorizationHeader,
	withValidToken,
	withValidModifyProduct,
	controller.update
)

router.delete(
	'/:productId',
	withProductIdParameter,
	withAuthorizationHeader,
	withValidToken,
	controller.delete
)

export default router
