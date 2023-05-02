import styles from './Orders.module.css'
import Orders from '../../components/orders/Orders'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { addOrders } from "../../store/actions";
import { useDispatch } from "react-redux";

export default function () {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const routeChange = (path: string) => {
    navigate(path)
  }

  useEffect(() => {
    fetch('http://localhost:3000/orders', {
      method: "GET",
        headers: {
          "Content-type": "application/json"
        },
        // credentials: 'include'
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error('unable to fetch data')
      })
      .then(data => {
        dispatch(addOrders(data))
      })
      .catch(error => {
        console.log('Catched error: ', error)
      })
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.pageTitle}>
          <p>Orders</p>
          <h1>Total Orders</h1>
        </div>
        <button
          className={styles.button}
          onClick={() => routeChange('/addorder')}
        >Create Order</button>
      </div>

      <Orders />
    </div>
  )
}
