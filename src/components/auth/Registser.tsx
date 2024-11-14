import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import organizationsEnum from '../../types/organizationsEnum';
import './auth.css'
import { useAppSelector } from '../../redux/store';

export default function Register() {
  const [userName, setUserName]= useState('');
  const [password, setPassword]= useState('');
  const [organization, setOrganization]= useState<organizationsEnum>(organizationsEnum.Hamas);
  const user = useAppSelector(state=>state.user.user);
  const navigate = useNavigate()  

  useEffect(() => {
    if(user){
      navigate('/game')
    }
  })
  const send = async()=>{
    try {
      const response = await fetch("http://localhost:3030/users/register",{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
          userName,
          password,
          organization,
        })
      })
      if(!response.ok){
        alert("faild to register")
        throw new Error("faild to register")
      }
      navigate('/login')
    } catch (error) {
      console.log((error as Error).message)
    }
  }

  return (
    <>
      <div className='page'>
        <input type="text" placeholder='user name' onChange={(e)=>{setUserName(e.target.value)}} value={userName} />
        <input type="password" placeholder='password'  onChange={(e)=>{setPassword(e.target.value)}} value={password}/>
        <select onChange={(e)=>{setOrganization(e.target.value as organizationsEnum)}}>
          <option value={organizationsEnum.Hamas}>{organizationsEnum.Hamas}</option>
          <option value={organizationsEnum.Houthis}>{organizationsEnum.Houthis}</option>
          <option value={organizationsEnum.Hezbollah}>{organizationsEnum.Hezbollah}</option>
          <option value={organizationsEnum.IRGC}>{organizationsEnum.IRGC}</option>
          <option value={organizationsEnum.IDF_Center}>IDF</option>
        </select>
        {organization.startsWith("IDF") && <select onChange={(e)=>{setOrganization(e.target.value as organizationsEnum)}}>
            <option value={organizationsEnum.IDF_Center}>{organizationsEnum.IDF_Center}</option>
            <option value={organizationsEnum.IDF_North}>{organizationsEnum.IDF_North}</option>
            <option value={organizationsEnum.IDF_South}>{organizationsEnum.IDF_South}</option>
            <option value={organizationsEnum.IDF_West_Bank}>{organizationsEnum.IDF_West_Bank}</option>
          </select>}
        <button onClick={send}>Register</button>
      </div>
      <button className='transfer' onClick={()=>{navigate('/login')}}>Already have an account ? Login</button>
    </>
  )
}
