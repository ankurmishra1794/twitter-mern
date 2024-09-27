import axios from 'axios';
import React, { useState } from 'react';
import {USER_API_END_POINT} from '../utils/constants';
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux';
import { getUser } from '../redux/userSlice';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleSignUp() {
    setIsLogin(!isLogin);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if(isLogin) {
      try {
        let res = await axios.post(`${USER_API_END_POINT}/login`,{email,password},{
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        });
        dispatch(getUser(res?.data?.user));        
        if(res.data.success) {
          toast.success(res.data.message)
          navigate("/home");
        }          
      } catch(error) {
        toast.error(error)
      }      
    } else {
      try {
        let res = await axios.post(`${USER_API_END_POINT}/register`,{name,username,email,password},{
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        });
        if(res.data.success) {
          toast.success(res.data.message)
          setIsLogin(true);
        }          
      } catch(error) {
        toast.error(error)
        
      }      
    }
  }

  return (
    <div className='flex items-center justify-center w-screen h-screen'>
      <div className='flex items-center justify-center'>
        <div>
          <img width={"350px"} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpevfm2P0BtgC9LbXH1n2Xp-oR-iLX8xQTBg&s" />
        </div>
        <div>
          <h1 className='font-bold text-5xl'>Happening Now.</h1>
          <h6 className='font-bold text-lg my-2'>
            {isLogin ? 'Login' : 'Signup'}
          </h6>
          <form onSubmit={handleSubmit} className='flex flex-col gap-2 w-[80%]'>
            {!isLogin && <>
              <input type='text' value={name} onChange={e=>setName(e.target.value)} placeholder='Name' className='rounded-full border-2 border-gray-200 pl-3 py-1 outline-none' />
              <input type='text' value={username} onChange={e=>setUsername(e.target.value)} placeholder='Username'  className='rounded-full border-2 border-gray-200 pl-3 py-1 outline-none' />
            </> }
            <input type='text' value={email} onChange={e=>setEmail(e.target.value)} placeholder='Email'  className='rounded-full border-2 border-gray-200 pl-3 py-1 outline-none' />
            <input type='password' value={password} onChange={e=>setPassword(e.target.value)} placeholder='Password'  className='rounded-full border-2 border-gray-200 pl-3 py-1 outline-none' />
            <button className='bg-[#1D9BF0] mt-3 py-2 px-4 rounded-full border-none text-white'>{isLogin ? 'Login' : 'Signup'}</button>
          </form>        
          {!isLogin && <p className='mt-5 font-semibold'>Already have an account? 
            <span onClick={handleSignUp} className='hover:cursor-pointer text-blue-400 pl-1'>Login</span> 
          </p>}
          {isLogin && <p className='mt-5 font-semibold'>Don't have an account? 
            <span onClick={handleSignUp} className='hover:cursor-pointer text-blue-400 pl-1'>Create Account</span>
          </p>}
        </div>
      </div>
    </div>
    
  )
}
