// export const fullfilment_status = ['ready to start', 'processing', 'fullfiled']
export const fullfilment_status = [{ id: 's.0', status: '' }, { id: 's.1', status: 'Ready to start'}, {id: 's.2', status: 'Processing'}, {id: 's.3', status: 'Fulfilled'}]

// export const payment_status = ['unpaid', 'paid']
export const payment_status = [{id: 's.4', status: ''}, {id: 's.5', status: 'unpaid'}, {id: 's.6', status: 'paid'}]

// export const delivery_status = ['in hous', 'on the way', 'delivered']
export const delivery_status = [{id: 's.7', status: ''}, {id: 's.8', status: 'In hous'}, {id: 's.9', status: 'On the way'}, {id: 's.10', status: 'Delivered'}]

export const stage_1 = ['unpaid', 'In hous', 'Ready to start']
export const stage_2 = ['paid', 'Processing', 'On the way']
export const stage_3 = ['Fulfilled', 'Delivered']

export const dateFormater = (date: Date) => {
  const d = new Date(date)
  return d.toLocaleDateString()
}

// https://github.com/WebDevSimplified/react-ts-shopping-cart/blob/main/src/utilities/formatCurrency.ts
const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: "USD",
  style: "currency",
})

export function formatCurrency(number: number) {
  return CURRENCY_FORMATTER.format(number)
}