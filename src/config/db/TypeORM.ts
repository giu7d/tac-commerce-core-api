import { createConnection, getConnectionOptions } from 'typeorm'

export class TypeORM {
	static async config() {
		const connectionOptions = await getConnectionOptions()

		await createConnection(connectionOptions)
	}
}
