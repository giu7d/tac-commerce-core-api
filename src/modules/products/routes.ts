import { Router } from 'express'

import { withValidToken } from '@modules/shared/middlewares/token/withValidToken'
import { withAuthorizationHeader } from '@modules/shared/middlewares/token/withAuthorizationHeader'
import { withValidCreateProduct } from '@modules/products/middleware/validation/withValidCreateProduct'
import { withProductIdParameter } from '@modules/products/middleware/validation/withProductIdParameter'
import { withValidModifyProduct } from '@modules/products/middleware/validation/withValidModifyProduct'
import { CreateProductController } from '@modules/products/useCases/CreateProduct/CreateProductController'
import { ListProductController } from './useCases/ListProduct/ListProductController'
import { ShowProductController } from './useCases/ShowProduct/ShowProductController'
import { ModifyProductController } from './useCases/ModifyProduct/ModifyProductController'
import { DeleteProductController } from './useCases/DeleteProduct/DeleteProductController'

const router = Router()

router.post(
	'/',
	withAuthorizationHeader,
	withValidToken,
	withValidCreateProduct,
	CreateProductController.handle
)

router.get('/', ListProductController.handle)

router.get('/:productId', withProductIdParameter, ShowProductController.handle)

router.put(
	'/:productId',
	withProductIdParameter,
	withAuthorizationHeader,
	withValidToken,
	withValidModifyProduct,
	ModifyProductController.handle
)

router.delete(
	'/:productId',
	withProductIdParameter,
	withAuthorizationHeader,
	withValidToken,
	DeleteProductController.handle
)

export default router
