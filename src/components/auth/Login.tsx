import  { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { fetchLogin } from '../../redux/slices/userSlice'
import './auth.css'
import { useNavigate } from 'react-router-dom';
import { socket } from '../../main';

export default function Login() {
  const [userName, setUserName]= useState('');
  const [password, setPassword]= useState('');
  const dispatch = useAppDispatch();
  const user = useAppSelector(state=>state.user);
  const navigate = useNavigate();
  const log = ()=>{
    dispatch(fetchLogin({userName, password}))
  }
  useEffect(() => {
    if(user.user){
      navigate('/game')
    }
  },[user])
  return (
    <>
      <div className='authpage'>
        <input type="text" placeholder='user name' onChange={(e)=>{setUserName(e.target.value)}} value={userName} />
        <input type="password" placeholder='password'  onChange={(e)=>{setPassword(e.target.value)}} value={password}/>
        <button className='myButtons' onClick={log}>Login</button>
      </div> 
      <button className='transfer myButtons'  onClick={()=>{navigate('/register')}}>don't have an account yet ? Register</button>
    </>
  )
}