import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, cleanup, waitFor, fireEvent } from "@testing-library/react"
import renderer, { ReactTestRendererJSON } from 'react-test-renderer'
import user from '@testing-library/user-event'
import { Provider } from "react-redux"
import configureStore from "redux-mock-store" //To mock the store
import AddOrder from "../components/addOrder/AddOrder"
import { MemoryRouter } from 'react-router-dom' // To mock navigation


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

// test('should render AddOrder component', () => {
//   render(
//     <Provider store={store}>
//       <MemoryRouter>
//         <AddOrder />   
//       </MemoryRouter>
//   </Provider>
   
//   );

//   const addOrderElement = screen.getByTestId('add-1');
//   expect(addOrderElement).toBeInTheDocument();
//   //Too specific not a good test, just an example:
//   // expect(addOrderElement).toHaveTextContent('New Order')
//   // expect(addOrderElement).toContainHTML('<form>')

// })

// console.log(TestRenderer)

// test('matches snapshot', () => {
//   const tree = renderer.create(
//   <Provider store={store}>
//       <MemoryRouter>
//         <AddOrder />   
//       </MemoryRouter>
//   </Provider>
//   ).toJSON();
  
//   expect(tree).toMatchSnapshot();
// console.log(tree)
// })

describe('AddOrder input validation', () => {
  const onSubmit = jest.fn();

  beforeEach(() => {
    onSubmit.mockClear();
    render(
      <Provider store={store}>
       <MemoryRouter>
          <AddOrder onSubmit={onSubmit} />
        </MemoryRouter>
     </Provider>
    )
  })

  it('onSubmit is called when all fields pass validation', async () => {
    user.type(getID(), '100');
    user.type(getClient(), 'Client');
    user.type(getDate(), '2070-05-25T23:12');
    user.type(getQuantity(), '1000000');
    user.type(getCharge(), '100');
    user.type(getFClient(), '100');
    // user.selectOptions(delivery, within(delivery).getByRole('option', {name: 'unpaid'}))
    // user.selectOptions(dropdown, within(dropdown).getByRole('option', { name: 'Processing' }))
    // user.selectOptions(dropdown, within(dropdown).getByRole('option', {name: 'Delivered'}))

    const addButton = screen.getByTestId('add')
    console.log(addButton)
    user.click(addButton);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
    })

    expect(onSubmit).toHaveBeenCalledWith({
      algo: true
    })

  })

})

/// Form input validation 
function getID() {
  return screen.getByTestId('id') //, {
      // name: /ID/i
    // })
}

function getClient() {
  return screen.getByTestId('ourClient') //, {
      // name: /Our client/i
    // })
}

function getDate() {
  return screen.getByTestId('date') //, {
      // name: /Date/i
    // })
}

function getQuantity() {
  return screen.getByTestId('quantity') //, {
    // name: /Quantity/i
  // })
}

function getCharge() {
  return screen.getByTestId('charge')//, {
    // name: /Charge/i
  // })
}

function getFClient() {
  return screen.getByTestId('finalClient') //, {
    // name: /Final client/i
  // })
}