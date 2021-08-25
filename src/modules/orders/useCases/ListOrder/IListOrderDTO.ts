export interface IListOrderDTO {
	accountId: string
	paymentStatus?: 'waiting-approval' | 'approved' | 'returned'
	shipmentStatus?: 'ordered' | 'shipped' | 'received'
}
