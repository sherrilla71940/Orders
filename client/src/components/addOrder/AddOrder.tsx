import { useState } from "react";
import styles from "./AddOrder.module.css";
import {
  payment_status,
  fullfilment_status,
  delivery_status,
} from "../../utilities/utilities";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addOrder } from "../../store/actions";
import Order from "../../Order";
import { v4 as uuidv4 } from "uuid";

//Note:In React with TypeScript, when handling input changes, you can use the React.ChangeEvent<T> event type,
// where T represents the type of the input element. The specific type for each input element can vary depending
// on the type of data being handled. For example:
// <input type="text" />: React.ChangeEvent<HTMLInputElement>
// <input type="checkbox" />: React.ChangeEvent<HTMLInputElement>
// <textarea></textarea>: React.ChangeEvent<HTMLTextAreaElement>
// <select></select>: React.ChangeEvent<HTMLSelectElement>

// So in order to handle all types at once in the handleChange function we create a union type:
type InputChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;

export default function AddOrder() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // handling multi-line forms with one single handleChange function for each input type
  // https://www.pluralsight.com/guides/handling-multiple-inputs-with-single-onchange-handler-react
  const [state, setState] = useState({
    id: uuidv4(),
    ourClient: "",
    quantity: 0,
    charge: 0,
    finalClient: "",
    date: null,
    payment: "",
    fullfilment: "",
    delivery: "",
  });

  //Note special type declared in this component for different kind of input types
  const handleChange = (e: InputChangeEvent) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const baseUrl = "http://localhost:3000";
    // const baseUrl = import.meta.env.VITE_BASE_URL

    const postOrder = async (order: Order) => {
      const response = await fetch(baseUrl + "/orders", {
        mode: "cors",
        method: "POST",
        credentials: "include",
        body: JSON.stringify(order),
        headers: {
          "Content-type": "application/json",
        },
      });
      return await response.json();
    };
    console.log(state);
    await postOrder(state);
    dispatch(addOrder(state));
    navigate("/orders");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.pageTitle}>
          <p>Orders</p>
          <h1>Add New Order</h1>
        </div>
      </div>

      <form
        className={styles.form}
        onSubmit={async (e) => await handleSubmit(e)}
      >
        <h1>New Order</h1>

        <label htmlFor="id">ID</label>
        <input
          type="text"
          id="id"
          name="id"
          value={uuidv4()}
          onChange={handleChange}
          required
        ></input>

        <label htmlFor="ourClient">Our client</label>
        <input
          type="text"
          id="ourClient"
          name="ourClient"
          value={state.ourClient}
          onChange={handleChange}
          required
        ></input>

        <label htmlFor="date">Date</label>
        <input
          type="datetime-local"
          id="date"
          name="date"
          min={new Date().toISOString().slice(0, 16)}
          value={
            state.date ? new Date(state.date).toISOString().slice(0, 16) : ""
          }
          onChange={handleChange}
          required
        ></input>

        <label htmlFor="quantity">Quantity</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          min="1"
          max="1000000"
          value={state.quantity}
          onChange={handleChange}
          required
        ></input>

        <label htmlFor="charge">Charge</label>
        <input
          type="number"
          id="charge"
          name="charge"
          min="0"
          max="10000000"
          value={state.charge}
          onChange={handleChange}
          required
        ></input>

        <label htmlFor="finalClient">Final client</label>
        <input
          type="text"
          id="finalClient"
          name="finalClient"
          value={state.finalClient}
          onChange={handleChange}
          required
        ></input>

        <div className={styles.selectors}>
          <div className={styles.selector}>
            <label htmlFor="payment">Payment</label>
            <select
              className={styles.select}
              name="payment"
              value={state.payment}
              onChange={handleChange}
            >
              {payment_status.map((status) => (
                <option key={status.id} value={status.status}>
                  {status.status}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.selector}>
            <label htmlFor="fullfilment">Fullfilment</label>
            <select
              className={styles.select}
              name="fullfilment"
              value={state.fullfilment}
              onChange={handleChange}
            >
              {fullfilment_status.map((status) => (
                <option key={status.id} value={status.status}>
                  {status.status}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.selector}>
            <label htmlFor="delivery">Delivery</label>
            <select
              className={styles.select}
              name="delivery"
              value={state.delivery}
              onChange={handleChange}
            >
              {delivery_status.map((status) => (
                <option key={status.id} value={status.status}>
                  {status.status}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.buttons}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={() => navigate("/orders")}
          >
            Cancel
          </button>

          <button type="submit" className={styles.addButton}>
            Add Order
          </button>
        </div>
      </form>
    </div>
  );
}
