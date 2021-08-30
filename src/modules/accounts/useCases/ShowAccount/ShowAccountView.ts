import { Account } from '@modules/accounts/entities/Account'

export class ShowAccountView {
	static json(data: Account) {
		return {
			id: data.id,
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
			isAdmin: data.isAdmin
		}
	}
}
