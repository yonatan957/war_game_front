import { Navigate, Route, Routes } from "react-router-dom"
import Login from "./components/auth/Login"

function App() {

  return (
    <div className="app">
      <Routes>
        <Route path="login" element={<Login/>}/>
        <Route path='/' element={<Navigate to={'/login'}/>}/>
      </Routes>
    </div>
  )
}

export default App
