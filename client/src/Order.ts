type Order = {
    id: number,
    ourClient: string,
    date: Date | null,
    quantity: number,
    charge: number,
    finalClient: string,
    payment: string,
    fullfilment: string,
    delivery: string
}

export default Order