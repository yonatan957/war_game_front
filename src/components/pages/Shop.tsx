import { decreseBudget, encrese, useAppDispatch, useAppSelector } from '../../redux/store'
import missels from '../pages/missiles.json'
import './pages.css'
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Shop() {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const buy = async(missle:string) =>{
    const token = user?.attacker? localStorage.getItem('Atoken') : localStorage.getItem('Dtoken')
    if(!token) return
    const res =await fetch(`${import.meta.env.VITE_BASE_URL}0/users/buyWeapon`, {
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
    <h1>Shop</h1>
    <br />
    <div className='shop'>
    <h1>Your budget:  {user?.budget}</h1>
    <div className='containorAccordion'>
    <div className="accordion" id="accordionExample">{
        user?.resources.map((resource) => (      
        <div className="accordion-item" key={resource.name}>
            <h2 className="accordion-header" id="headingOne">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#${resource.name.replace(" ", "")}`} aria-expanded="true" aria-controls="collapseOne">
                <h3>{resource.name}</h3>
              </button>
            </h2>
            <div id={resource.name.replace(" ", "")} className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <h2>price:{missels.find(missle => missle.name == resource.name)?.price}</h2>
                <br />
                <h5>quantity you have : {resource.amount}</h5>
                <strong>{missels.find(missle => missle.name == resource.name)?.description}</strong>
                <br />
                <br />
                <strong>{missels.find(missle => missle.name == resource.name)?.intercepts.map(i=><p key={i}>Good against {i}</p>)}</strong>
                <button className='buyButton' onClick={()=>{buy(resource.name)}}>Buy</button>
              </div>
            </div>
        </div>))
      }
    </div>
    </div>
    </div>
    </>
  )
}
