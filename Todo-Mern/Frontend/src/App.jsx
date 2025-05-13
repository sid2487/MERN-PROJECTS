import { Routes, Route } from "react-router-dom"
import Login from "./components/Login"
import Signup from "./components/Signup"
import PageNotFound from "./components/PageNotFound"
import Home from "./components/Home"

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  )
}

export default App
