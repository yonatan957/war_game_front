import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Registser";
import { RootState, useAppSelector } from "./redux/store";
import AttackSide from "./components/pages/attackSide/AttackSide";
import DefenceSide from "./components/pages/defenceSide/DefenceSide";
import { useEffect } from "react";
import { IO_functions } from "./socket/io";

function App() {
  const { user } = useAppSelector((state: RootState) => state.user);
  useEffect(()=>{
    ()=>{
      IO_functions();
    }
  },[])
  return (
    <div className="app">
      <div>
        {JSON.stringify(user)}
      </div>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/" element={<Navigate to={"/login"} />} />
        {user && (
          <Route
            path="/game"
            element={user.attacker ? <AttackSide /> : <DefenceSide />}
          />
        )}
      </Routes>
    </div>
  );
}

export default App;
