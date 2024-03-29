import { Router } from 'express'

import { withValidToken } from '@modules/shared/middlewares/token/withValidToken'
import { withAdminPermission } from '@modules/shared/middlewares/permissions/withAdminPermission'
import { withAuthorizationHeader } from '@modules/shared/middlewares/token/withAuthorizationHeader'
import { withValidCreateProduct } from '@modules/products/middlewares/validation/withValidCreateProduct'
import { withProductIdParameter } from '@modules/products/middlewares/validation/withProductIdParameter'
import { withValidModifyProduct } from '@modules/products/middlewares/validation/withValidModifyProduct'
import { CreateProductController } from '@modules/products/useCases/CreateProduct/CreateProductController'
import { ListProductController } from '@modules/products/useCases/ListProduct/ListProductController'
import { ShowProductController } from '@modules/products/useCases/ShowProduct/ShowProductController'
import { ModifyProductController } from '@modules/products/useCases/ModifyProduct/ModifyProductController'
import { DeleteProductController } from '@modules/products/useCases/DeleteProduct/DeleteProductController'
import { ListProductCategoryController } from './useCases/ListProductCategories/ListProductCategoryController'

const router = Router()

router.post(
	'/',
	withAuthorizationHeader,
	withValidToken,
	withValidCreateProduct,
	withAdminPermission,
	CreateProductController.handle
)

router.get('/', ListProductController.handle)

router.get('/categories', ListProductCategoryController.handle)

router.get('/:productId', withProductIdParameter, ShowProductController.handle)

router.put(
	'/:productId',
	withProductIdParameter,
	withAuthorizationHeader,
	withValidToken,
	withValidModifyProduct,
	withAdminPermission,
	ModifyProductController.handle
)

router.delete(
	'/:productId',
	withProductIdParameter,
	withAuthorizationHeader,
	withValidToken,
	withAdminPermission,
	DeleteProductController.handle
)

export default router
