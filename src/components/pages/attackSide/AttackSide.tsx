import { useEffect, useState } from 'react';
import { decrese, useAppDispatch, useAppSelector } from '../../../redux/store';
import AttackA from './AttackA';
import { socket } from '../../../main';
import { fetchAttacks } from '../../../redux/slices/AttacksSlice';
import '../pages.css';
import organizationsEnum from '../../../types/organizationsEnum';

export default function AttackSide() {
  const attackes = useAppSelector((state) => state.attacks.attacks);
  const user = useAppSelector((state) => state.user.user);
  const [activeMissles, setActiveMissles] =  useState<string[]>([]);
  const [organization, setOrganization]= useState<organizationsEnum>(organizationsEnum.IDF_Center);
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
    socket.emit("launch", {attack, token, location:organization})
    dispatch(decrese(missle))
  }
  return (
    <div className='page attackSide' >
      <div className='page'>
      <h1>Attack Side</h1>
      <div className="resurces">
        {user?.resources.map((resource) => (
          <h5 key={resource.name}>
            {resource.name}:    
            {resource.amount}
          </h5>
        ))}
      </div>
      <select onChange={(e)=>{setOrganization(e.target.value as organizationsEnum)}}>
            <option value={organizationsEnum.IDF_Center}>{organizationsEnum.IDF_Center}</option>
            <option value={organizationsEnum.IDF_North}>{organizationsEnum.IDF_North}</option>
            <option value={organizationsEnum.IDF_South}>{organizationsEnum.IDF_South}</option>
            <option value={organizationsEnum.IDF_West_Bank}>{organizationsEnum.IDF_West_Bank}</option>
      </select>
      <div className="resurces">
        {activeMissles.map((missle) => (
          <button key={missle} onClick={()=>{lounchMissle(missle)}}>Lonch {missle}</button>
        ))}
      </div>
      </div>
      <div className='attacks'>
        {attackes.filter(attack => attack.id_attacker == user?._id).map((attack) => (
            <AttackA attack={attack} key={attack._id}/>
        ))}
      </div>
    </div>
  )
}
