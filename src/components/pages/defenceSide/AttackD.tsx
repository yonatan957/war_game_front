import { useEffect, useState } from 'react';
import { decrese, useAppDispatch, useAppSelector } from '../../../redux/store';
import { IAttack } from '../../../types/attack'
import missles from '../missiles.json'
import { socket } from '../../../main';
import '../pages.css';

interface Props {
    attack: IAttack
}
export default function AttackD({attack}:Props) {
    const user = useAppSelector((state) => state.user.user);
    const dispatch = useAppDispatch();
    const fill = (): string[]=>{
        const interceports:string[] = []
        user?.resources.forEach((resource) => {
            const missle = missles.find(missle => missle.name == resource.name)
            if(missle?.intercepts.includes(attack.name.trim()) && missle.speed < attack.tymeToHit){
                interceports.push(resource.name)
            }
        })
        return interceports
    }
    const intercept = (interceptor: string) =>{        
        const token = localStorage.getItem('Dtoken');
        if(!token) return
        socket.emit("intercept", {interceptor, token, attack:  attack._id, time: attack.tymeToHit})
        dispatch(decrese(interceptor))
    }
    const [activeIntercptors, setActiveIntercptors] = useState<string[]>(fill()); 
    useEffect(() => {        
        setActiveIntercptors(Intercptors=>{
            return Intercptors.filter((interceptor) => {
                return (attack.tymeToHit > missles.find(missle => missle.name == interceptor)!.speed)
            })
        })
    }, [attack])
  return (
    <div className="card text-center">
    <div className="card-header">
      {attack.name}
    </div>
    <div className={`card-body ${!attack.intercepted ? 'bad' : 'good'}`}>
       {attack.tymeToHit!==0?<h4>Time to hit:{attack.tymeToHit}</h4>:(attack.intercepted?<h4>Intercepted</h4>:<h4>Exploded</h4>)}
       {attack.intercepted && (attack.id_intercepted == user?._id ? <h4>Intercepted by you</h4> : <h4>Intercepted by {attack.id_intercepted?.slice(0,5)}</h4>)}   
       {!attack.intercepted && activeIntercptors.map((interceptor) => (<button onClick={()=>{intercept(interceptor)}} key={interceptor}> Lounch {interceptor}</button>))} 
    </div>
        <div className="card-footer text-muted">
        keep going
        </div>
    </div>
  )
}