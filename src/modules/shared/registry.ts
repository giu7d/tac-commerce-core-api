import { container } from 'tsyringe'

import { AccountRepositoryTypeORM } from '@modules/accounts/repositories/AccountRepositoryTypeORM'
import { IAccountRepository } from '@modules/accounts/repositories/IAccountRepository'
import { ProductRepositoryTypeORM } from '@modules/products/repositories/ProductRepositoryTypeORM'
import { IProductRepository } from '@modules/products/repositories/IProductRepository'
import { OrderRepositoryTypeORM } from '@modules/orders/repositories/OrderRepositoryTypeORM'
import { IOrderRepository } from '@modules/orders/repositories/IOrderRepository'

container.registerSingleton<IAccountRepository>(
	'AccountRepository',
	AccountRepositoryTypeORM
)

container.registerSingleton<IProductRepository>(
	'ProductRepository',
	ProductRepositoryTypeORM
)

container.registerSingleton<IOrderRepository>(
	'OrderRepository',
	OrderRepositoryTypeORM
)
