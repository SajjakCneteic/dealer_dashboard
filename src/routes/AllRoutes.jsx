import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LogIn from '../pages/Login'
import SignUp from '../pages/Signup'
import Dashboard from '../pages/Dashboard'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import OrderList from '../pages/OrderList'

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<div className='flex h-screen'>
          <Sidebar />
          <div className='flex flex-col flex-grow'>
            <Navbar />
            <div className='flex-grow p-4 bg-gray-100'>
              <Dashboard />
            </div>
          </div>
        </div>} />
        <Route path="/orders/all" element={<div className='flex h-screen'>
          <Sidebar />
          <div className='flex flex-col flex-grow'>
            <Navbar />
            <div className='flex-grow p-4 bg-gray-100'>
              <OrderList />
            </div>
          </div>
        </div>} />
      </Routes>
    </>
  )
}

export default AllRoutes