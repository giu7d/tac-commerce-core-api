import { Account } from '@modules/accounts/entities/Account'

export class CreateAccountView {
	json(data: Account) {
		return {
			id: data.id
		}
	}
}
