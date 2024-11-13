import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../redux/store';
import { IAttack } from '../../../types/attack'
import missles from '../missiles.json'

interface Props {
    attack: IAttack
}
export default function AttackD({attack}:Props) {
    const user = useAppSelector((state) => state.user.user);
    const [activeIntercptors, setActiveIntercptors] = useState<string[]>(((): string[]=>{
        const intercepts:string[] = []
        user?.resources.forEach((resource) => {
            if(missles.find(missle => missle.name == resource.name)?.intercepts.includes(attack.name)){
                intercepts.push(resource.name)
            }
        })
        return intercepts
    })()); 
    useEffect(() => {        
        setActiveIntercptors(Intercptors=>{
            return Intercptors.filter((interceptor) => {
                return (attack.tymeToHit < missles.find(missle => missle.name == interceptor)!.speed)
            })
        })
    }, [attack.tymeToHit])
  return (
    <div>
      <h3>{attack.name}</h3>
      {!attack.id_intercepted && <h4>Time to hit:{attack.tymeToHit}</h4>}
      {attack.id_intercepted && attack.id_intercepted == user?._id ? <h4>Intercepted by you</h4> : <h4>Intercepted by {attack.id_intercepted}</h4>}   
      {activeIntercptors.map((interceptor) => (<button key={interceptor}>Lounch {interceptor}</button>))}   
    </div>
  )
}
