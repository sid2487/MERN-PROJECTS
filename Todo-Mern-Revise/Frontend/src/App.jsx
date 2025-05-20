import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import PageNotFound from './components/PageNotFound';
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App