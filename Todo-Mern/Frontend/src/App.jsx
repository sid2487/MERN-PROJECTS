import { Navigate, Routes, Route } from "react-router-dom"
import Login from "./components/Login"
import Signup from "./components/Signup"
import PageNotFound from "./components/PageNotFound"
import Home from "./components/Home"
import { Toaster } from "react-hot-toast"
import { useState } from "react"

function App() {
  // const [token, setToken] = useState(localStorage.getItem("jwt"));
  const token = localStorage.getItem("jwt");
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={token ? <Home /> : <Navigate to={"/login"} />}
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App
