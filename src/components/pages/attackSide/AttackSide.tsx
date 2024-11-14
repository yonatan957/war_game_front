import { useEffect, useState } from 'react';
import { decrese, useAppDispatch, useAppSelector } from '../../../redux/store';
import AttackA from './AttackA';
import { socket } from '../../../main';

export default function AttackSide() {
  const attackes = useAppSelector((state) => state.attacks.attacks);
  const user = useAppSelector((state) => state.user.user);
  const [activeMissles, setActiveMissles] =  useState<string[]>([]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    setActiveMissles(()=>{
      return user?.resources.filter((resource) => resource.amount > 0).map((resource) => resource.name) || []
    })
  },[user?.resources])
  const lounchMissle = (missle:string) =>{
    const token = localStorage.getItem('Atoken');
    if(!token) return
    const attack = {name: missle, id_attacker: user!._id};
    socket.emit("launch", {attack, token})
    dispatch(decrese(missle))
  }
  return (
    <div>
      <h1>Attack Side</h1>
      {user?.resources.map((resource) => (
          <div key={resource.name}>
            <p>{resource.name}</p>
            <p>{resource.amount}</p>
          </div>
        ))}
      <div>
        {activeMissles.map((missle) => (
          <button key={missle} onClick={()=>{lounchMissle(missle)}}>Lonch {missle}</button>
        ))}
        {attackes.filter(attack => attack.id_attacker == user?._id).map((attack) => (
          <AttackA attack={attack} key={attack._id}/>
        ))}
      </div>
    </div>
  )
}
