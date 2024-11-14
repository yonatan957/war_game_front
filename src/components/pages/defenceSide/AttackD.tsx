import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../redux/store';
import { IAttack } from '../../../types/attack'
import missles from '../missiles.json'
import { socket } from '../../../main';

interface Props {
    attack: IAttack
}
export default function AttackD({attack}:Props) {
    const user = useAppSelector((state) => state.user.user);
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
    <div>
      <h1>{activeIntercptors}</h1>
      <h3>{attack.name}</h3>
      {!attack.id_intercepted && <h4>Time to hit:{attack.tymeToHit}</h4>}
      {attack.id_intercepted && attack.id_intercepted == user?._id ? <h4>Intercepted by you</h4> : <h4>Intercepted by {attack.id_intercepted}</h4>}   
      {activeIntercptors.map((interceptor) => (<button onClick={()=>{intercept(interceptor)}} key={interceptor}> Lounch {interceptor}</button>))}   
    </div>
  )
}