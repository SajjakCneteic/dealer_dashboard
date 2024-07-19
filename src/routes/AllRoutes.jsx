import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LogIn from '../pages/Login'
import SignUp from '../pages/Signup'
import Dashboard from '../pages/Dashboard'

import DefaultLayout from '../pages/DefaultLayout'
import ProductList from '../pages/ProductList'
import AllOrderList from '../pages/AllOrderList'
import PendingOrderList from '../pages/PendingOrderList'
import CompleteOrderList from '../pages/CompleteOrderList'
import Profile from '../pages/Profile'
import Scan_order from '../pages/Scan_order'


const AllRoutes = () => {
  const isLoggedIn = true
  return (
    <>{!isLoggedIn&&<Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        </Routes>}
       {isLoggedIn&& <DefaultLayout>
      <Routes>
        <Route path='/' element={<Dashboard/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/all-orders' element={<AllOrderList/>} />
        <Route path='/orders/pending' element={<PendingOrderList/>} />
        <Route path='/orders/completed' element={<CompleteOrderList/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/scan-order' element={<Scan_order/>} />
        <Route path='/products' element={<ProductList/>} />
      </Routes>
        </DefaultLayout>}
      
    </>
  )
}

export default AllRoutes