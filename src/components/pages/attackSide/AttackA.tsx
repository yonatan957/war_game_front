import { useEffect } from "react"
import { IAttack } from "../../../types/attack"
import { socket } from "../../../main"
import { useAppSelector } from "../../../redux/store";
import '../pages.css';

interface props{
    attack: IAttack
}

export default function AttackA({attack}:props) {
  const user = useAppSelector((state) => state.user.user);
  useEffect(()=>{
    if(attack.tymeToHit == 0){
        const token = localStorage.getItem('Atoken');
        if(!token) return
        socket.emit("Attack_finished", {attack:attack._id, token})
    }
  },[attack])
  return (
    <div className='card cardA' style={{backgroundColor: attack.intercepted ? 'red' : 'green'}}>
      <h3>{attack.name}</h3>
      {!attack.intercepted && (attack.tymeToHit !==0?<h4>Time to hit:{attack.tymeToHit}</h4>:<h4>Exploded</h4>)}
      {attack.intercepted && <p>Intercepted by {attack.id_intercepted}</p>}
    </div>
  )
}