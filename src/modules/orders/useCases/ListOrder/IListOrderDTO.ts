export interface IListOrderDTO {
	paymentStatus?: 'waiting-approval' | 'approved' | 'returned'
	shipmentStatus?: 'ordered' | 'shipped' | 'received'
}
