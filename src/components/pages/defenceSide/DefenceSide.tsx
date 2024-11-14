import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import AttackD from "./AttackD";
import { fetchAttacks } from "../../../redux/slices/AttacksSlice";
import '../pages.css';

export default function DefenceSide() {
  const attackes = useAppSelector((state) => state.attacks.attacks);
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch()
  useEffect(()=>{
    const token = localStorage.getItem('Atoken');
    if(!token) return
    dispatch(fetchAttacks({token, url: 'myAttacks'} ))
  },[])
  return (
    <div className='page defenceSide'>
      <h1>Defence Side</h1>
      <div>
        {user?.resources.map((resource) => (
          <label key={resource.name}>
            {resource.name}:
            {resource.amount}
          </label>
        ))}
      </div>
      <div className="attacks">
        {attackes.map((attack) => (
          <AttackD attack={attack} key={attack._id}/>
        ))}
      </div>
    </div>
  );
}
