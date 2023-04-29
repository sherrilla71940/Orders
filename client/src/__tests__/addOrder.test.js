import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, cleanup } from "@testing-library/react"
import renderer, { ReactTestRendererJSON} from 'react-test-renderer'
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
      <MemoryRouter>
        <AddOrder />   
      </MemoryRouter>
  </Provider>
   
  );

  const addOrderElement = screen.getByTestId('add-1');
  expect(addOrderElement).toBeInTheDocument();
  //Too specific not a good test, just an example:
  expect(addOrderElement).toHaveTextContent('New Order')
  // expect(addOrderElement).toContainHTML('<form>')

})

// console.log(TestRenderer)

test('matches snapshot', () => {
  const tree = renderer.create(
  <Provider store={store}>
      <MemoryRouter>
        <AddOrder />   
      </MemoryRouter>
  </Provider>
  ).toJSON();
  
  expect(tree).toMatchSnapshot();
console.log(tree)
})