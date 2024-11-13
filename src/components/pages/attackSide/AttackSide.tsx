import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../redux/store';
import AttackA from './AttackA';

export default function AttackSide() {
  const attackes = useAppSelector((state) => state.attacks.attacks);
  const user = useAppSelector((state) => state.user.user);
  const [activeMissles, setActiveMissles] =  useState<string[]>([]);
  useEffect(() => {
    setActiveMissles(()=>{
      return user?.resources.filter((resource) => resource.amount > 0).map((resource) => resource.name) || []
    })
  },[user?.resources])
  return (
    <div>
      <h1>Attack Side</h1>
      <div>
        {activeMissles.map((missle) => (
          <button key={missle}>Lonch {missle}</button>
        ))}
        {attackes.filter(attack => attack.id_attacker == user?._id).map((attack) => (
          <AttackA attack={attack} key={attack._id}/>
        ))}
      </div>
    </div>
  )
}
