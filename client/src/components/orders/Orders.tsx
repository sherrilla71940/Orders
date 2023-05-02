import styles from './Orders.module.css'
import { useSelector, useDispatch } from "react-redux";
import { updateOrder } from "../../store/actions";
import {
  dateFormater,
  delivery_status,
  fullfilment_status,
  payment_status,
  stage_1,
  stage_2,
  stage_3,
  formatCurrency
} from '../../utilities/utilities'


export default function Orders() {

  const dispatch = useDispatch()

  // use to change the color in the select HTML tag. Not yet implemented
  const handleClass = (e: React.ChangeEvent<HTMLInputElement> ) => {
    const value = e.target.value

    if (stage_1.includes(value)) {
      e.target.classList.add(`${styles.bg_stage_1}`)
      e.target.classList.remove(`${styles.bg_stage_2}`)
      e.target.classList.remove(`${styles.bg_stage_3}`)
    }
    if (stage_2.includes(value)) {
      e.target.classList.add(`${styles.bg_stage_2}`)
      e.target.classList.remove(`${styles.bg_stage_1}`)
      e.target.classList.remove(`${styles.bg_stage_3}`)
    }
    if (stage_3.includes(value)) {
      e.target.classList.add(`${styles.bg_stage_3}`)
      e.target.classList.remove(`${styles.bg_stage_1}`)
      e.target.classList.remove(`${styles.bg_stage_2}`)
    }
    // console.log(e.target.classList)
  }

  const orders = useSelector((state) => state.orders);

  const handleChange = (idAndProcess) => {

    fetch('http://localhost:3000/orders', {
      method: "PUT",
      body: JSON.stringify(idAndProcess),
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error('unable to fetch data')
      })
      .then(data => {
        dispatch(updateOrder(data))
        // console.log(data)
      })
      .catch(error => {
        console.log('Catched error: ', error)
      })
  }

  return (
    <>
      <div className={styles.tableWrapper}>
        <table className={styles.container}>
          <thead className={styles.tableHead}>
            <tr>
              <th>ID</th>
              <th>Our client</th>
              <th>Date</th>
              <th>Quantity</th>
              <th>Charge</th>
              <th>Payment</th>
              <th>Fullfilment</th>
              <th>Final client</th>
              <th>Delivery</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>

            {
              orders.map(order => (
                <tr key={order.id} className={styles.tableRow}>
                  <td>{order.id}</td>
                  <td>{order.ourClient}</td>
                  <td>{dateFormater(order.date)}</td>
                  <td>{order.quantity}</td>
                  <td>{formatCurrency(order.charge)}</td>

                  <td className={styles.selectContainer}>{
                    <select
                      className={styles.select}
                      name='payment' value={order.payment}
                      onChange={(e) => handleChange({
                        id: order.id, payment: e.target.value
                      })}
                    >
                      {payment_status.map(status => (
                        <option key={status.id} value={status.status}>{status.status}</option>
                      ))}
                    </select>
                  }</td>

                  <td className={styles.selectContainer}>{
                    <select
                      className={styles.select}
                      name='fullfilment' value={order.fullfilment}
                      onChange={(e) => handleChange({
                        id: order.id, fullfilment: e.target.value
                      })}
                    >
                      {fullfilment_status.map(status => (
                        <option key={status.id} value={status.status}>{status.status}</option>
                      ))}
                    </select>
                  }</td>

                  <td>{order.finalClient}</td>

                  <td className={styles.selectContainer} >
                  <select
                    className={styles.select}
                    name='delivery'
                    value={order.delivery}
                    onChange={
                      (e) => {
                        handleChange({
                          id: order.id, delivery: e.target.value
                        });
                        // handleClass(e)
                      }
                    }
                  >
                    {delivery_status.map(status => (
                      <option
                        key={status.id}
                        value={status.status}
                      >
                        {status.status}
                      </option>
                    ))}
                  </select>
                </td>

                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  )
}
