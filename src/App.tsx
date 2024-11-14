import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Registser";
import {
  addAttack,
  cancelAttack,
  RootState,
  updateTimeLeft,
  useAppDispatch,
  useAppSelector,
} from "./redux/store";
import AttackSide from "./components/pages/attackSide/AttackSide";
import DefenceSide from "./components/pages/defenceSide/DefenceSide";
import { useEffect } from "react";
import { socket } from "./main";
import { IAttack } from "./types/attack";
import Shop from "./components/pages/Shop";
import NavBar from "./components/pages/NavBar";

function App() {
  const { user } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const attacks = useAppSelector((state) => state.attacks.attacks);
  
  //for listening to socket
  useEffect(() => {
    socket.on("launched", (data: IAttack) => {
      dispatch(addAttack(data));
    });

    socket.on("intercepted", (attack: IAttack) => {
      dispatch(cancelAttack(attack));
    });

    return () => {
      socket.off("launched");
      socket.off("cancelAttack");
      localStorage.removeItem("Atoken");
      localStorage.removeItem("Dtoken");
    };
  }, []);

  //for update time left in active attacks
  useEffect(() => {
    const interval = setInterval(() => {
      attacks
        .filter((attack) => !attack.intercepted)
        .forEach((attack) => {
          if (attack.tymeToHit && attack.tymeToHit > 0) {
            dispatch(
              updateTimeLeft({ id: attack._id, timeLeft: attack.tymeToHit - 1 })
            );
          }
        });
    }, 1000);
    return () => clearInterval(interval);
  }, [attacks]);
  return (
    <div className="app">
      <NavBar />
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/" element={<Navigate to={"/login"} />} />
        <Route path="/game" element={user? (user.attacker ? <AttackSide /> : <DefenceSide/>): <Navigate to={'/login'} />}/>
        <Route path="/shop" element={user? <Shop/>: <Navigate to={'/login'} />}/>
      </Routes>
    </div>
  );
}

export default App;
