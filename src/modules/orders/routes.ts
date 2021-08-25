import { Router } from 'express'

import { withValidToken } from '@modules/shared/middlewares/token/withValidToken'
import { withAuthorizationHeader } from '@modules/shared/middlewares/token/withAuthorizationHeader'
import { withValidCreateOrder } from '@modules/orders/middlewares/validation/withValidCreateOrder'
import { withOrderIdParameter } from '@modules/orders/middlewares/validation/withOrderIdParameter'
import { withValidModifyOrder } from '@modules/orders/middlewares/validation/withValidModifyOrder'
import { withListOrderQuery } from '@modules/orders/middlewares/validation/withListOrderQuery'
import { CreateOrderController } from '@modules/orders/useCases/CreateOrder/CreateOrderController'
import { ModifyOrderController } from '@modules/orders/useCases/ModifyOrder/ModifyOrderController'
import { ShowOrderController } from '@modules/orders/useCases/ShowOrder/ShowOrderController'
import { LinkOrderController } from '@modules/orders/useCases/ListOrder/ListOrderController'

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
