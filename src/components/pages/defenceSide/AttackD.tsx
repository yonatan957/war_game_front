import { IAttack } from '../../../types/attack'

interface Props {
    attack: IAttack
}
export default function AttackD({attack}:Props) {
  return (
    <div>
      <h3>{attack.name}</h3>
      {!attack.id_intercepted && <h4>Time to hit:{attack.tymeToHit}</h4>}
    </div>
  )
}
