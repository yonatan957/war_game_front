import { IAttack } from "../../../types/attack"

interface props{
    attack: IAttack
}

export default function AttackA({attack}:props) {
  return (
    <div>
      <h3>{attack.name}</h3>
      {!attack.intercepted && <h4>Time to hit:{attack.tymeToHit}</h4>}
      {!!attack.id_intercepted && <p>Intercepted by {attack.id_intercepted}</p>}
    </div>
  )
}
