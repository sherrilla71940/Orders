import { render, screen, cleanup } from "@testing-library/react"
import AddOrder from "../components/addOrder/AddOrder"
import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from 'redux';
// import rootReducer from '../reducers'; // Your combined reducers

// Create a mock Redux store for testing
const store = configureStore(rootReducer);

test('should render AddOrder component', () => {
  render(<AddOrder />);

  const addOrderElement = screen.getAllByTestId('add-1');
  expect(addOrderElement).toBeInTheDocument();


})