import React from 'react'
import { FaArrowLeft } from "react-icons/fa6";
import { Link, useParams } from 'react-router-dom'
import Avatar from 'react-avatar';
import LeftSideBar from "./LeftSideBar";
import RightSideBar from "./RightSideBar";
import useProfile from '../hooks/useProfile';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constants';
import toast from 'react-hot-toast';
import {getFollowUpdate} from '../redux/userSlice';

export default function Profile() {
  const {profile,user} = useSelector(store=>store.user);      
  const dispatch = useDispatch();
  
  let {id} = useParams();
  
  let loggedInUserId = user?._id;
  let clickedProfileId = id;
  
  async function handleFollow() {
    try {
      let res = await axios.put(
        `${USER_API_END_POINT}/follow/${loggedInUserId}`,
        {id:clickedProfileId},
        {withCredentials: true}
      );
      dispatch(getFollowUpdate(clickedProfileId));
      if(res.data.status)
        toast.success(res.data.message);  
    } catch (error) {
      toast.error(error.response.data.message);
    }    
  }

  async function handleUnfollow() {
    try {
      let res = await axios.put(
        `${USER_API_END_POINT}/unfollow/${loggedInUserId}`,
        {id:clickedProfileId},
        {withCredentials: true}
      );
      dispatch(getFollowUpdate(clickedProfileId));
      if(res.data.status)
        toast.success(res.data.message);  
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  useProfile(id);
  return (
    <>
      <div className="flex justify-between w-[80%] mx-auto">
        <LeftSideBar />
        <div className='w-[50%] border-gray-200 border-l border-r'>
          <div className='relative'>        
            <div className='flex items-center gap-10 pl-10 py-3'>
              <Link to="/home" className='hover:cursor-pointer p-2 hover:bg-gray-200 rounded-full'>
                <FaArrowLeft size="20px"/>
              </Link>
              <div>
                <h2 className='font-bold text-lg'>{profile?.name}</h2>
                <p className='text-gray-500'>10 post</p>
              </div>
            </div>      
            <div>
              <img src='https://t4.ftcdn.net/jpg/04/95/28/65/360_F_495286577_rpsT2Shmr6g81hOhGXALhxWOfx1vOQBa.jpg' alt="banner" />
            </div>
            <div className='absolute left-5 -bottom-14 border-white border-4 rounded-full'>
              <Avatar src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" size="120" round={true} />      
            </div>                
          </div>
          <div className='text-right mt-5'>
              { loggedInUserId === clickedProfileId 
                ? <button className='px-7 py-2 border-black border-2 rounded-full hover:bg-gray-200'>Edit Profile</button>
                : ( user.following.includes(clickedProfileId) 
                    ? <button className='px-7 py-2 border-black border-2 rounded-full hover:bg-gray-200' onClick={handleUnfollow}>Unfollow</button>
                    : <button className='px-7 py-2 border-black border-2 rounded-full hover:bg-gray-200' onClick={handleFollow}>Follow</button>                  
                  )    
              }
          </div>
          <div className='text-left mt-3'>
            <h1 className='font-bold'>{profile?.name}</h1>
            <p>@{profile?.username}</p>
          </div>
          <div className='mt-4'>
            Whenever you see a successful person, you only see the public glories, never the private sacrifices to reach them.
          </div>
        </div>
        <RightSideBar />
      </div>
    </>
  )
}
