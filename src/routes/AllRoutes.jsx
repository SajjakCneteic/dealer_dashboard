import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LogIn from '../pages/Login'
import SignUp from '../pages/Signup'
import Dashboard from '../pages/Dashboard'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import AllOrderList from '../pages/AllOrderList'
import PendingOrderList from '../pages/PendingOrderList'
import CompleteOrderList from '../pages/CompleteOrderList'
import Profile from '../pages/Profile'
import Settings from '../pages/Settings'
import ProductList from '../pages/ProductList'
import Scan_order from '../pages/Scan_order'

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<div className='flex h-screen'>
          <Sidebar />
          <div className='flex flex-col flex-grow'>
            <Navbar />
            <div className='flex-grow p-4 bg-gray-100'>
              <Dashboard />
            </div>
          </div>
        </div>} />
        <Route path="/dashboard" element={<div className='flex h-screen'>
          <Sidebar />
          <div className='flex flex-col flex-grow'>
            <Navbar />
            <div className='flex-grow p-4 bg-gray-100'>
              <Dashboard />
            </div>
          </div>
        </div>} />
        <Route path="/all-orders" element={<div className='flex h-screen'>
          <Sidebar />
          <div className='flex flex-col flex-grow'>
            <Navbar />
            <div className='flex-grow p-4 bg-gray-100'>
              <AllOrderList />
            </div>
          </div>
        </div>} />
        <Route path="/orders/pending" element={<div className='flex h-screen'>
          <Sidebar />
          <div className='flex flex-col flex-grow'>
            <Navbar />
            <div className='flex-grow p-4 bg-gray-100'>
              <PendingOrderList />
            </div>
          </div>
        </div>} />
        <Route path="/orders-completed" element={<div className='flex h-screen'>
          <Sidebar />
          <div className='flex flex-col flex-grow'>
            <Navbar />
            <div className='flex-grow p-4 bg-gray-100'>
              <CompleteOrderList/>
            </div>
          </div>
        </div>} />
        <Route path="/profile" element={<div className='flex h-screen'>
          <Sidebar />
          <div className='flex flex-col flex-grow'>
            <Navbar />
            <div className='flex-grow p-4 bg-gray-100'>
              <Profile />
            </div>
          </div>
        </div>} />
        <Route path="/settings" element={<div className='flex h-screen'>
          <Sidebar />
          <div className='flex flex-col flex-grow'>
            <Navbar />
            <div className='flex-grow p-4 bg-gray-100'>
              <Settings />
            </div>
          </div>
        </div>} />
        <Route path="/products" element={<div className='flex h-screen'>
          <Sidebar />
          <div className='flex flex-col flex-grow'>
            <Navbar />
            <div className='flex-grow p-4 bg-gray-100'>
              <ProductList />
            </div>
          </div>
        </div>} />
        <Route path="/scan-order" element={<div className='flex h-screen'>
          <Sidebar />
          <div className='flex flex-col flex-grow'>
            <Navbar />
            <div className='flex-grow p-4 bg-gray-100'>
              <Scan_order />
            </div>
          </div>
        </div>} />
      </Routes>
      
    </>
  )
}

export default AllRoutes