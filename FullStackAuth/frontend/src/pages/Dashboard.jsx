import React from 'react'
import axios from '../utils/axiosInsatnce.js';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.get("/logout");
            localStorage.removeItem("token");
            alert("Logged out successfully");
            navigate("/login");
        } catch (error) {
            console.error("Logout error: ", error);
            alert("Logout failed");
        }
    }
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white'>
        <h1 className='text-3xl mb-6'>Dasboard</h1>
        <button onClick={handleLogout} className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded '>Logout</button>
    </div>
  )
}

export default Dashboard