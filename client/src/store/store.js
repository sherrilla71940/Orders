import { configureStore, combineReducers } from '@reduxjs/toolkit'
// import Order from '../Order';

// const initialState: Order[] = []
const initialState = [];

const ADD_ORDER = 'ADD_ORDER';
const ADD_ORDERS = 'ADD_ORDERS';
const UPDATE_STATUS = 'UPDATE_STATUS';
const orders = (state = initialState, action) => {

  switch (action.type) {
    case ADD_ORDER:
      return [...state, action.payload];

    case ADD_ORDERS:
      return [...action.payload];

//     case UPDATE_STATUS:
//       const [keys, values] = Object.entries(action.payload);
//       console.log(action.payload)
//       return state.map(o => {
//         if (o.id === action.payload.id) {
//           o[values[0]] = values[1]
//           return o;
//         } else {
//           return o;
//         }
//       });

    default:
      return state
  }
}

const reducers = combineReducers({
  orders
});

const store = configureStore({ reducer: reducers })

export default store;