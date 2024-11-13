import  { useState } from 'react'
import { useAppDispatch } from '../../redux/store'
import { fetchLogin } from '../../redux/slices/userSlice'

export default function Login() {
  const [userName, setUserName]= useState('');
  const [password, setPassword]= useState('');
  const dispatch = useAppDispatch();

  return (
    <div className='page'>
      <input type="text" placeholder='user name' onChange={(e)=>{setUserName(e.target.value)}} value={userName} />
      <input type="password" placeholder='password'  onChange={(e)=>{setPassword(e.target.value)}} value={password}/>
      <button onClick={()=>{dispatch(fetchLogin({userName, password}))}}>Login</button>
    </div>
  )
}