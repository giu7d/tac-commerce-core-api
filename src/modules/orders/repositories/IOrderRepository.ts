import { Order } from '@modules/orders/entities/Order'
import { FindConditions } from 'typeorm'

export interface IOrderRepository {
	save(order: Order): Promise<void>
	findAll(options: FindConditions<Order>): Promise<Order[]>
	findById(id: string): Promise<Order | undefined>
	modify(id: string, order: Partial<Omit<Order, 'id'>>): Promise<void>
	delete(id: string): Promise<void>
}
