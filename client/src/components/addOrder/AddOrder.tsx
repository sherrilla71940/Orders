import { useState } from 'react'
import styles from './AddOrder.module.css'
import { payment_status, fullfilment_status, delivery_status } from '../../utilities/utilities';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";

import { addOrder } from "../../store/actions";

export default function AddOrder() {

  const navigate = useNavigate()
  const dispatch = useDispatch();

  // handling multi-line forms with one single handleChange function for each input type
  // https://www.pluralsight.com/guides/handling-multiple-inputs-with-single-onchange-handler-react
  const [state, setState] = useState({
    id: '',
    ourClient: '',
    quantity: '',
    charge: '',
    finalClient: '',
    date: '',
    payment: '',
    fullfilment: '',
    delivery: ''
  })

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const baseUrl = 'http://localhost:3000'
    // const baseUrl = import.meta.env.VITE_BASE_URL

    const postOrder = async (order) => {
      console.log(order)
      const response = await fetch(baseUrl + '/orders', {
        method: "POST",
        body: JSON.stringify(order),
        headers: {
          "Content-type": "application/json"
        }
      })
      return await response.json()
    }
    postOrder(state)
    dispatch(addOrder(state))
    navigate('/orders')
  }

  return (
    <div className={styles.container}>

      <div className={styles.header}>
        <div className={styles.pageTitle}>
          <p>Orders</p>
          <h1>Add New Order</h1>
        </div>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>New Order</h1>

        <label htmlFor='id'>ID</label>
        <input type='number' id='id' name='id' min='0' max='1000000' value={state.id} onChange={handleChange} required></input>

        <label htmlFor='ourClient'>Our client</label>
        <input type='text' id='ourClient' name='ourClient' value={state.ourClient} onChange={handleChange} required></input>

        <label htmlFor='date'>Date</label>
        <input type='datetime-local' id='date' name='date' min={new Date().toISOString().slice(0,16)} value={state.date} onChange={handleChange} required></input>

        <label htmlFor='quantity'>Quantity</label>
        <input type='number' id='quantity' name='quantity' min='0' max='1000000' value={state.quantity} onChange={handleChange} required></input>

        <label htmlFor='charge'>Charge</label>
        <input type='number' id='charge' name='charge' min='0' max='10000000' value={state.charge} onChange={handleChange} required></input>

        <label htmlFor='finalClient'>Final client</label>
        <input type='text' id='finalClient' name='finalClient' value={state.finalClient} onChange={handleChange} required></input>

        <div className={styles.selectors}>

          <div className={styles.selector}>
            <label htmlFor='payment'>Payment</label>
            <select className={styles.select} name='payment' value={state.payment} onChange={handleChange}>
              {payment_status.map(status => (
                <option key={status.id} value={status.status}>{status.status}</option>
              ))}
            </select>
          </div>

          <div className={styles.selector}>
            <label htmlFor='fullfilment'>Fullfilment</label>
            <select className={styles.select} name='fullfilment' value={state.fullfilment} onChange={handleChange}>
              {fullfilment_status.map(status => (
                <option key={status.id} value={status.status}>{status.status}</option>
              ))}
            </select>
          </div>

          <div className={styles.selector}>
            <label htmlFor='delivery'>Delivery</label>
            <select className={styles.select} name='delivery' value={state.delivery} onChange={handleChange}>
              {delivery_status.map(status => (
                <option key={status.id} value={status.status}>{status.status}</option>
              ))}
            </select>
          </div>

        </div>

        <div className={styles.buttons}>

          <button
            type='button'
            className={styles.cancelButton}
            onClick={() => navigate('/orders')}
          >
            Cancel
          </button>

          <button
            type='submit'
            className={styles.addButton}
          >
            Add Order
          </button>

        </div>
      </form>
    </div>
  )
}
