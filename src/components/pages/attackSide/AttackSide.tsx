import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../redux/store';
import AttackA from './AttackA';
import { socket } from '../../../main';

export default function AttackSide() {
  const attackes = useAppSelector((state) => state.attacks.attacks);
  const user = useAppSelector((state) => state.user.user);
  const [activeMissles, setActiveMissles] =  useState<string[]>([]);
  useEffect(() => {
    setActiveMissles(()=>{
      return user?.resources.filter((resource) => resource.amount > 0).map((resource) => resource.name) || []
    })
  },[user?.resources])
  const lounchMissle = (missle:string) =>{
    console.log(missle)
    const token = localStorage.getItem('token');
    const attack = {name: missle, id_attacker: user!._id};
    socket.emit("launch", {attack, token})
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
