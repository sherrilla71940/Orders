import React from 'react';
import { render, screen, cleanup } from "@testing-library/react"
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"; //To mock the store
import AddOrder from "../components/addOrder/AddOrder"
import { MemoryRouter } from 'react-router-dom'; // To mock navigation

// Create a mock Redux store for testing
const mockStore = configureStore([]);
const store = mockStore({ //Provide initial state
  id: '',
    ourClient: '',
    quantity: '',
    payment: '',
    charge: '',
    finalClient: '',
    date: '',
    fullfilment: ''
});

test('should render AddOrder component', () => {
  render(
  <Provider store={store}>
    <AddOrder />   
  </Provider>
   
  );

  const addOrderElement = screen.getByTestId('add-1');
  expect(addOrderElement).toBeInDocument();


})