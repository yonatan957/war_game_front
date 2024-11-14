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

function App() {
  const { user } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const attacks = useAppSelector((state) => state.attacks.attacks);
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
  }, [attacks, dispatch]);
  return (
    <div className="app">
      <div>{JSON.stringify(user)}</div>
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
