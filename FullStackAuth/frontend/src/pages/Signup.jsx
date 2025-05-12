import React, { useState } from 'react'
import axios from "../utils/axiosInsatnce.js"
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", password: ""});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("/signup", formData);
            alert(res.data.message);
            navigate("/login");
        } catch (error) {
            alert(error.response?.data?.errors || "Signup Failed");
        }
    }

    
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-900'>
      <div className="w-full max-w-md bg-black p-6 rounded-2xl shadow-md ">
        <h2 className="text-2xl font-bold mb-4 text-center text-white">
          Signup
        </h2>
        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <input
            className="border p-2 rounded placeholder-amber-50"
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={handleChange}
          />
          <input
            className="border p-2 rounded placeholder-amber-50"
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={handleChange}
          />
          <input
            className="border p-2 rounded placeholder-amber-50"
            type="email"
            name="email"
            placeholder="Emaiil"
            onChange={handleChange}
          />
          <input
            className="border p-2 rounded placeholder-amber-50"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <button className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup