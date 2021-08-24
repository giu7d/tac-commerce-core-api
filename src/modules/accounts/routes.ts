import { Router } from 'express'

import { withOwnerPermission } from '@modules/accounts/middlewares/permissions/withOwnerPermission'
import { withAccountIdParameter } from '@modules/accounts/middlewares/validation/withAccountIdParameter'
import { withValidModifyAccount } from '@modules/accounts/middlewares/validation/withValidModifyAccount'
import { withAuthorizationHeader } from '@modules/shared/middlewares/token/withAuthorizationHeader'
import { withValidToken } from '@modules/shared/middlewares/token/withValidToken'
import { withValidCreateAccount } from '@modules/accounts/middlewares/validation/withValidCreateAccount'
import { withValidAuthenticateAccount } from './middlewares/validation/withValidAuthenticateAccount'

import { AuthenticateAccountController } from '@modules/accounts/useCases/AuthenticateAccount/AuthenticateAccountController'
import { CreateAccountController } from './useCases/CreateAccount/CreateAccountController'
import { ModifyAccountController } from './useCases/ModifyAccount/ModifyAccountController'
import { DeleteAccountController } from './useCases/DeleteAccount/DeleteAccountController'
import { ShowAccountController } from './useCases/ShowAccount/ShowAccountController'

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
	withOwnerPermission,
	ModifyAccountController.handle
)

router.delete(
	'/:accountId',
	withAccountIdParameter,
	withAuthorizationHeader,
	withValidToken,
	withOwnerPermission,
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
