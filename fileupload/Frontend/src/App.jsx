import React from 'react'
import { Routes, Route } from "react-router-dom"
import CreateUser from './components/CreateUser';
import FetchUser from './components/FetchUser';

const App = () => {
  
  return (
    <Routes>
      <Route path='/' element={<CreateUser />} />
      <Route path='/fetch' element={<FetchUser />} />
    </Routes>
  )
}

export default App;