import React, { useState } from 'react'
import axios from '../utils/axiosInsatnce.js';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: ""});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("/login", formData);
            console.log(res);
            localStorage.setItem("token", res.data.token);
            alert("Login Successful");
            navigate("/dashboard")
        } catch (error) {
            alert(error.response?.data?.errors || "Login failed");
        }
    }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md bg-black p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-white">
          Login
        </h2>
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <input
            name="email"
            className="border p-2 rounded placeholder-amber-50"
            type="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            name="password"
            className="border p-2 rounded placeholder-amber-50"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <button className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login