export interface ICreateOrderDTO {
	accountId: string
	items: {
		quantity: number
		productId: string
	}[]
	shipmentAddress: {
		number: string
		street: string
		city: string
		additionalInformation: string
		uf: string
		cep: string
	}
}
