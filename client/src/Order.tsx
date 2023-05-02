type Order = {
    id: number,
    ourClient: string,
    quantity: number,
    charge: number,
    finalClient: string,
    date: Date | null,
    payment: string,
    fullfilment: string,
    delivery: string
}

export default Order