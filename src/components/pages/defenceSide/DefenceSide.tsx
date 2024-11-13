import { useAppSelector } from "../../../redux/store";
import AttackD from "./AttackD";

export default function DefenceSide() {
  const attackes = useAppSelector((state) => state.attacks.attacks);
  const user = useAppSelector((state) => state.user.user);
  return (
    <div>
      <h1>Defence Side</h1>
      <div>
        {user?.resources.map((resource) => (
          <div key={resource.name}>
            <p>{resource.name}</p>
            <p>{resource.amount}</p>
          </div>
        ))}
      </div>
      {attackes.map((attack) => (
        <AttackD attack={attack} key={attack._id}/>
      ))}
    </div>
  );
}
