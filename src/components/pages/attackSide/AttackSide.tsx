import { useEffect, useState } from 'react';
import { decrese, useAppDispatch, useAppSelector } from '../../../redux/store';
import AttackA from './AttackA';
import { socket } from '../../../main';
import { fetchAttacks } from '../../../redux/slices/AttacksSlice';
import '../pages.css';

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
  useEffect(()=>{
    const token = localStorage.getItem('Atoken');
    if(!token) return
    dispatch(fetchAttacks({token, url: 'myAttacks'} ))
  },[])
  const lounchMissle = (missle:string) =>{
    const token = localStorage.getItem('Atoken');
    if(!token) return
    const attack = {name: missle, id_attacker: user!._id};
    socket.emit("launch", {attack, token})
    dispatch(decrese(missle))
  }
  return (
    <div className='page attackSide' >
      <h1>Attack Side</h1>
      <div>
        {user?.resources.map((resource) => (
          <label key={resource.name}>
            {resource.name}:
            {resource.amount}
          </label>
        ))}
      </div>
      <div>
        {activeMissles.map((missle) => (
          <button key={missle} onClick={()=>{lounchMissle(missle)}}>Lonch {missle}</button>
        ))}
      </div>
      <div className='attacks'>
        {attackes.filter(attack => attack.id_attacker == user?._id).map((attack) => (
            <AttackA attack={attack} key={attack._id}/>
        ))}
      </div>
    </div>
  )
}
