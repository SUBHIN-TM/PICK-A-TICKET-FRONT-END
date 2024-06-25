import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Layout = () => {
  return ( //SET A LAYOUT TO DISPLAY COMMON CONTENT OF NAVBAR AND FOOTED
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default Layout