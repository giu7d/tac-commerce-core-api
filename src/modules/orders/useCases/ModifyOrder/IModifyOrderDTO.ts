export interface IModifyOrderDTO {
	id: string
	shipmentStatus: 'ordered' | 'shipped' | 'received'
}
