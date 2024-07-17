import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LogIn from '../pages/Login'
import SignUp from '../pages/Signup'

const AllRoutes = () => {
  return (
    <>
     <Routes>
        <Route path="/login" element={<LogIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>

     </Routes>
    </>
  )
}

export default AllRoutes