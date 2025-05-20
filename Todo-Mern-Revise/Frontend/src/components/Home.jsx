import React, { useEffect, useState } from 'react';
import axios from "axios";
import toast from 'react-hot-toast';



const Home = () => {

    const [todos, setTodos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [newTodo, setNewTodo] = useState("");

    useEffect(() => {
      const fetchtodos = async () => {
        try {
          setLoading(true);
          const response = await axios.get(
            "http://localhost:5001/todo/fetchtodos",
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log(response.data);
          setTodos(response.data.todos);
          setError(null);
        } catch (error) {
          setError("Failed to fetch todos");
        } finally {
          setLoading(false);
        }
      };
      fetchtodos();
    }, []);
  return (
    <div className=" my-10 bg-gray-100 max-w-lg lg:max-w-xl rounded-lg shadow-lg mx-8 sm:mx-auto p-6">
      <h1 className="text-2xl font-semibold text-center">Todo App</h1>

      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Add a new todo"
          className="flex-grow p-2 border rounded-l-md focus:outline-none"
        />
        <button className="bg-blue-600 border rounded-r-md text-white px-4 py-2 hover:bg-blue-900 duration-300">
          Add
        </button>
      </div>

      <ul className="space-y-2">
        <li className="flex items-center justify-between p-3 bg-gray-100 rounded-md">
          <div className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span>clean the home today</span>
          </div>
          <button className="text-red-500 hover:text-red-800 duration-300">
            Delete
          </button>
        </li>
      </ul>

      <p className="mt-4 text-center text-sm text-gray-700">
        X remaining todos
      </p>
      <button className="mt-6 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-800 duration-500 mx-auto block">Logout</button>
    </div>
  );
}

export default Home