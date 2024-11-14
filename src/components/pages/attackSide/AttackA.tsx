import { useEffect } from "react"
import { IAttack } from "../../../types/attack"
import { socket } from "../../../main"
import '../pages.css';


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
  return (<>
    <div className="card text-center">
        <div className="card-header">
          {attack.name}
        </div>
        <div className={`card-body ${attack.intercepted ? 'bad' : 'good'}`}>
          {!attack.intercepted && (attack.tymeToHit !==0?<h4>Time to hit:{attack.tymeToHit}</h4>:<h4>Exploded</h4>)}
          {attack.intercepted && <p>Intercepted by {attack.id_intercepted?.slice(0,5)}</p>}
        </div>
        <div className="card-footer text-muted">
          keep going
        </div>
    </div>
    </>
    
  )
}