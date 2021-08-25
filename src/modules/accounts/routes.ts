import { Router } from 'express'

import { withValidToken } from '@modules/shared/middlewares/token/withValidToken'
import { withAuthorizationHeader } from '@modules/shared/middlewares/token/withAuthorizationHeader'
import { ShowAccountController } from '@modules/accounts/useCases/ShowAccount/ShowAccountController'
import { withAccountIdParameter } from '@modules/accounts/middlewares/validation/withAccountIdParameter'
import { withValidModifyAccount } from '@modules/accounts/middlewares/validation/withValidModifyAccount'
import { withValidCreateAccount } from '@modules/accounts/middlewares/validation/withValidCreateAccount'
import { CreateAccountController } from '@modules/accounts/useCases/CreateAccount/CreateAccountController'
import { ModifyAccountController } from '@modules/accounts/useCases/ModifyAccount/ModifyAccountController'
import { DeleteAccountController } from '@modules/accounts/useCases/DeleteAccount/DeleteAccountController'
import { withValidAuthenticateAccount } from '@modules/accounts/middlewares/validation/withValidAuthenticateAccount'
import { AuthenticateAccountController } from '@modules/accounts/useCases/AuthenticateAccount/AuthenticateAccountController'
import { withOwnerAccountPermission } from '@modules/accounts/middlewares/permission/withOwnerAccountPermission'

const router = Router()

router.post('/', withValidCreateAccount, CreateAccountController.handle)

router.post(
	'/auth',
	withValidAuthenticateAccount,
	AuthenticateAccountController.handle
)

router.put(
	'/:accountId',
	withAccountIdParameter,
	withAuthorizationHeader,
	withValidModifyAccount,
	withValidToken,
	withOwnerAccountPermission,
	ModifyAccountController.handle
)

router.delete(
	'/:accountId',
	withAccountIdParameter,
	withAuthorizationHeader,
	withValidToken,
	withOwnerAccountPermission,
	DeleteAccountController.handle
)

router.get(
	'/:accountId',
	withAccountIdParameter,
	withAuthorizationHeader,
	withValidToken,
	ShowAccountController.handle
)

export default router
