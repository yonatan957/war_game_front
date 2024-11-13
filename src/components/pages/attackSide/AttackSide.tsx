import { useAppSelector } from '../../../redux/store';

export default function AttackSide() {
  const attackes = useAppSelector((state) => state.attacks.attacks);
  return (
    <div>AttackSide</div>
  )
}
