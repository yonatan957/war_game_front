import { useEffect, useState } from "react"
import { IAttack } from "../../../types/attack"
import { socket } from "../../../main"
import { useAppSelector } from "../../../redux/store";
import '../pages.css';
import organizationsEnum from "../../../types/organizationsEnum";

interface props{
    attack: IAttack
}

export default function AttackA({attack}:props) {
  useEffect(()=>{
    if(attack.tymeToHit == 0){
        const token = localStorage.getItem('Atoken');
        if(!token) return
        socket.emit("Attack_finished", {attack:attack._id, token})
    }
  },[attack])
  return (
    <div className='card cardA' style={{backgroundColor: attack.intercepted ? 'rgb(249, 86, 86)' : 'rgb(2, 136, 24)'}}>
      <h3>{attack.name}</h3>
      {!attack.intercepted && (attack.tymeToHit !==0?<h4>Time to hit:{attack.tymeToHit}</h4>:<h4>Exploded</h4>)}
      {attack.intercepted && <p>Intercepted by {attack.id_intercepted?.slice(0,5)}</p>}
    </div>
  )
}