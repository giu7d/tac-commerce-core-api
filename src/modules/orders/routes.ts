import { Router } from 'express'

import { withValidToken } from '@modules/shared/middlewares/token/withValidToken'
import { withAdminPermission } from '@modules/shared/middlewares/permissions/withAdminPermission'
import { withAuthorizationHeader } from '@modules/shared/middlewares/token/withAuthorizationHeader'

import { withListOrderQuery } from '@modules/orders/middlewares/validation/withListOrderQuery'
import { ShowOrderController } from '@modules/orders/useCases/ShowOrder/ShowOrderController'
import { LinkOrderController } from '@modules/orders/useCases/ListOrder/ListOrderController'
import { withValidModifyOrder } from '@modules/orders/middlewares/validation/withValidModifyOrder'
import { withValidCreateOrder } from '@modules/orders/middlewares/validation/withValidCreateOrder'
import { withOrderIdParameter } from '@modules/orders/middlewares/validation/withOrderIdParameter'
import { CreateOrderController } from '@modules/orders/useCases/CreateOrder/CreateOrderController'
import { ModifyOrderController } from '@modules/orders/useCases/ModifyOrder/ModifyOrderController'

const router = Router()

router.post(
	'/',
	withAuthorizationHeader,
	withValidToken,
	withValidCreateOrder,
	CreateOrderController.handle
)

router.get(
	'/',
	withAuthorizationHeader,
	withValidToken,
	withListOrderQuery,
	LinkOrderController.handle
)

router.put(
	'/:orderId',
	withAuthorizationHeader,
	withValidToken,
	withOrderIdParameter,
	withValidModifyOrder,
	withAdminPermission,
	ModifyOrderController.handle
)

router.get(
	'/:orderId',
	withAuthorizationHeader,
	withValidToken,
	withOrderIdParameter,
	ShowOrderController.handle
)

export default router
