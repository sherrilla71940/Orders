import styles from './Navbar.module.css'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h1
          className={styles.dashboard}
          onClick={() => navigate('/')}
        >
          DASHBOARD
        </h1>
      </div>

      <form className={styles.form}>
        <input className={styles.searchbar}></input>
      </form>

      <div className={styles.userInfo}>
        <button className={styles.signupButton} onClick={() => navigate('/signup')}>Sign up</button>
        <button className={styles.loginButton} onClick={() => navigate('/login')}>Log in</button>
        <div className={styles.thumbnail}></div>
        <div className={styles.user}>
          <p className={styles.name}>Username</p>
          <p className={styles.occupation}>roll</p>
        </div>
      </div>
    </div>
  )
}
