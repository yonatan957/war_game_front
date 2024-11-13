import { Navigate, Route, Routes } from "react-router-dom"
import Login from "./components/auth/Login"
import Register from "./components/auth/Registser"

function App() {

  return (
    <div className="app">
      <Routes>
        <Route path="login" element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
        <Route path='/' element={<Navigate to={'/login'}/>}/>
      </Routes>
    </div>
  )
}

export default App
