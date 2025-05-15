import axios from 'axios';
import React, { useState } from 'react';
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5001/user/signup",
        {
          username,
          email,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
      console.log(data);
      toast.success(data.message || "User Regisetered Successfully")
      localStorage.setItem("jwt", data.token);
      navigateTo("/login");
      setUserName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.errors || "User Registration Failed")
    }
  };


  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-5 text-center">Signup</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block mb-2 font-semibold" htmlFor="">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter Your UserName"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-semibold" htmlFor="">
              Email
            </label>
            <input
              type="text"
              placeholder="Enter Your Email"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-semibold" htmlFor="">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Your Password"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type='submit' className='w-full bg-blue-500 hover:bg-blue-600 duration-300 rounded-xl font-semibold p-3 cursor-pointer'>
            SignUp
            </button>

          <p className='mt-4 text-center text-gray-600'>
            Already have an account <Link to="/login" className='text-blue-500 hover:underline'>Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup