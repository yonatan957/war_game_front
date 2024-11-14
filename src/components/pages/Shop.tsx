import { decreseBudget, encrese, useAppDispatch, useAppSelector } from '../../redux/store'
import missels from '../pages/missiles.json'


export default function Shop() {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const buy = async(missle:string) =>{
    console.log(missle)
    const token = user?.attacker? localStorage.getItem('Atoken') : localStorage.getItem('Dtoken')
    if(!token) return
    const res =await fetch('http://localhost:3030/users/buyWeapon', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({missle:missle}),
    })
    if(!res.ok) {window.alert("faild to buy");throw new Error("faild to buy")}
    dispatch(encrese(missle))
    dispatch(decreseBudget(missels.find(mis => mis.name == missle.trim())?.price!))
  }
  return (
    <>
    <div>Shop</div>
    <h1>Your budget:{user?.budget}</h1>
    {user?.resources.map((resource) => (<div key={resource.name}>
      <p>{resource.name}:{resource.amount}</p>
      <p>{missels.find(missle => missle.name == resource.name)?.price}</p>
      <button onClick={()=>{buy(resource.name)}}>Buy</button>
      </div>))}
    </>
  )
}
