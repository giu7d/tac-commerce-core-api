import { Account } from '@modules/accounts/entities/Account'

export class CreateAccountView {
	static json(data: Account) {
		return {
			id: data.id
		}
	}
}
