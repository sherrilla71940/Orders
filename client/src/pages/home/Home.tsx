import styles from './Home.module.css'
import PageHeader from '../../components/pageHeader/PageHeader';
import landingImg from '../../assets/LandingImg.png'


export default function Home() {
  return (
    <div className={styles.container}>
      <PageHeader p={'Welcome'} h1={'Home'}/>
      <h1>The Best Management Tool for Your Business</h1>
      <p>Join for more info</p>
      <img src={landingImg}/>
    </div>
  )
}
