import { Router } from 'express'

import { AccountsController } from '@modules/accounts/controller'
import { withValidToken } from '@modules/accounts/middlewares/token/withValidToken'
import { withOwnerPermission } from '@modules/accounts/middlewares/permissions/withOwnerPermission'
import { withAccountIdParameter } from '@modules/accounts/middlewares/validation/withAccountIdParameter'
import { withValidCreateAccount } from '@modules/accounts/middlewares/validation/withValidCreateAccount'
import { withValidModifyAccount } from '@modules/accounts/middlewares/validation/withValidModifyAccount'
import { withAuthenticateAccount } from '@modules/accounts/middlewares/validation/withAuthenticateAccount'
import { withAuthorizationHeader } from '@modules/accounts/middlewares/validation/withAuthorizationHeader'

const controller = new AccountsController()

const router = Router()

router.post('/', withValidCreateAccount, controller.create)

router.post('/auth', withAuthenticateAccount, controller.authenticate)

router.put(
	'/:accountId',
	withAccountIdParameter,
	withAuthorizationHeader,
	withValidModifyAccount,
	withValidToken,
	withOwnerPermission,
	controller.update
)

router.delete(
	'/:accountId',
	withAccountIdParameter,
	withAuthorizationHeader,
	withValidToken,
	withOwnerPermission,
	controller.delete
)

router.get(
	'/:accountId',
	withAccountIdParameter,
	withAuthorizationHeader,
	withValidToken,
	controller.read
)

export default router
