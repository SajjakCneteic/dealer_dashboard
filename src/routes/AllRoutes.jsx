import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LogIn from '../pages/Login'
import SignUp from '../pages/Signup'
import Dashboard from '../pages/Dashboard'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import OrderList from '../pages/OrderList'
import DefaultLayout from '../pages/DefaultLayout'

const AllRoutes = () => {
  return (
    <>
        <DefaultLayout>
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path='/' element={<Dashboard/>} />
      </Routes>
        </DefaultLayout>
    </>
  )
}

export default AllRoutes