import { Navigate, Route, Routes } from "react-router-dom"
import Login from "./components/auth/Login"
import Register from "./components/auth/Registser"
import { RootState, useAppSelector } from "./redux/store"
import AttackSide from "./components/pages/AttackSide"
import DefenceSide from "./components/pages/DefenceSide"

function App() {
  const {user} = useAppSelector((state:RootState) =>state.user);
  return (
    <div className="app">
      <Routes>
        <Route path="login" element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
        <Route path='/' element={<Navigate to={'/login'}/>}/>
        {user && <Route path='/game' element={user.attacker?<AttackSide/>:<DefenceSide />}/>}
      </Routes>
    </div>
  )
}

export default App
