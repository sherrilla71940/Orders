import './App.css'

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home'
import Orders from './pages/orders/Orders'
import Sidebar from './components/sidebar/Sidebar'
import AddOrder from './components/addOrder/AddOrder'
import Signup from './pages/signup/Signup'
import Login from './pages/login/Login'

function App() {

  return (

    <BrowserRouter>
      <Navbar />
      <div className="App">
      <Sidebar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/orders' element={<Orders />} />
        <Route path='/addorder' element={<AddOrder />} />
      </Routes>
      </div>
    </BrowserRouter>

  )
}

export default App
