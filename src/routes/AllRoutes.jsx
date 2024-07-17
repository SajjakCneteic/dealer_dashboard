import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LogIn from '../pages/Login'
import SignUp from '../pages/Signup'
import Dashboard from '../pages/Dashboard'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const AllRoutes = () => {
  return (
    <>
     <Routes>
        <Route path="/login" element={<LogIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
<Route path="/" element={<>
<Navbar/>
<Sidebar/>
<Dashboard/>
</>}/>
     </Routes>
    </>
  )
}

export default AllRoutes