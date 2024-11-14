import { NavLink } from 'react-router-dom'
import { initUser, RootState, useAppDispatch, useAppSelector } from '../../redux/store'

export default function NavBar() {
    const user = useAppSelector((state:RootState)=>state.user.user)
    const dispatch = useAppDispatch()
    const logout = ()=>{
      localStorage.removeItem("token")
      dispatch(initUser())
    }
  return (
    <div className='nav'>
        {user?
        <>
            <NavLink to={'/shop'}>Shop</NavLink>
            <NavLink to={'/game'}>Game</NavLink>
            <button className='myButtons' onClick={logout}>log out</button>
        </>:<>
            <NavLink to={'/login'}>login</NavLink>
            <NavLink to={'/register'}>register</NavLink>
        </>}
    </div>
  )
}
