export const addOrder = (order) => ({
  type: "ADD_ORDER", payload: order
});

export const addOrders = (order) => {
  return {
  type: "ADD_ORDERS", payload: order
}};

export const updateOrder = (order) => {
  return {
  type: "UPDATE_STATUS", payload: order
}};
