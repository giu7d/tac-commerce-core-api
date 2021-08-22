import { Account } from '@modules/accounts/entities/Account'

export class ShowAccountView {
	json(data: Account) {
		return {
			id: data.id,
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email
		}
	}
}
