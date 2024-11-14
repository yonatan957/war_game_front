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
    const token = localStorage.getItem('Dtoken');
    if(!token) return
    dispatch(fetchAttacks({token, url: 'myThrets'} ))
  },[])
  return (
    <div className='page defenceSide'>
      <div className="page">
      <h1>Defence Side</h1>
      <div className="resurces">
        {user?.resources.map((resource) => (
          <h5 key={resource.name}>
            {resource.name}:    
            {resource.amount}
          </h5>
        ))}
      </div>
      </div>
      <div className="attacks">
        {attackes.map((attack) => (
          <AttackD attack={attack} key={attack._id}/>
        ))}
      </div>
    </div>
  );
}
