import { Router } from 'express'
import { AccountsController } from '@modules/accounts/controller'
import { verifyTokenAuthenticity } from '@modules/accounts/middlewares/token/verifyTokenAuthenticity'
import { validateAccountIdParameter } from '@modules/accounts/middlewares/validation/validateAccountIdParameter'
import { validateAuthenticateAccount } from '@modules/accounts/middlewares/validation/validateAuthAccount'
import { validateAuthorizationHeader } from '@modules/accounts/middlewares/validation/validateAuthorizationHeader'
import { validateCreateAccount } from '@modules/accounts/middlewares/validation/validateCreateAccount'
import { validateModifyAccount } from '@modules/accounts/middlewares/validation/validateModifyAccount'

const controller = new AccountsController()

const router = Router()

router.post('/', validateCreateAccount, controller.create)

router.post('/auth', validateAuthenticateAccount, controller.authenticate)

router.put(
	'/:accountId',
	validateAccountIdParameter,
	validateAuthorizationHeader,
	validateModifyAccount,
	verifyTokenAuthenticity,
	controller.update
)

router.delete(
	'/:accountId',
	validateAccountIdParameter,
	validateAuthorizationHeader,
	verifyTokenAuthenticity,
	controller.delete
)

router.get(
	'/:accountId',
	validateAccountIdParameter,
	validateAuthorizationHeader,
	verifyTokenAuthenticity,
	controller.read
)

export default router
