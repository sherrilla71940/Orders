import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/pageHeader/PageHeader";
import styles from "./Login.module.css";

export default function Login() {
  const navigate = useNavigate();
  const [emailErrorMessage, setEmailMessageError] = useState("");
  const [passwordErrorMessage, setPasswordMessageError] = useState("");

  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setNewUser({
      ...newUser,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const baseUrl = "http://localhost:3000/login";

    try {
      console.log("new user", newUser);
      const res = await fetch(baseUrl, {
        mode: "cors",
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      });

      console.log("-->", res);
      const data = await res.json();

      if (data.user) {
        navigate("/orders");
        console.log(data.user);
      }
      if (data.response && (data.response.email || data.response.password)) {
        setEmailMessageError(data.response.email);
        setPasswordMessageError(data.response.password);
      } else {
        setEmailMessageError("ok");
        setPasswordMessageError("ok");
        setTimeout(() => {
          if (data.user) navigate("/orders");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <PageHeader p={"Welcome"} h1={"Log in"} />
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Log in</h1>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={newUser.email}
          onChange={handleChange}
          required
        />
        <div className={styles.errorMessage}>{emailErrorMessage}</div>

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={newUser.password}
          onChange={handleChange}
          required
        />

        <div className={styles.errorMessage}>{passwordErrorMessage}</div>

        <button className={styles.button}>Log in</button>
      </form>
    </div>
  );
}
