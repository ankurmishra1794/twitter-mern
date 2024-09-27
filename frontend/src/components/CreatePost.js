import React, { useState } from 'react'
import Avatar from 'react-avatar';
import { FaRegFileImage } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { TWEET_API_END_POINT } from '../utils/constants';
import axios from 'axios';
import toast from 'react-hot-toast';
import { getRefresh,getIsActive } from '../redux/tweetSlice';
import useAllTweets from '../hooks/useAllTweets';

export default function CreatePost() {
  const [post, setPost] = useState(null);

  let {user} = useSelector(store => store.user);
  let {isActive} = useSelector(store => store.tweet);  
  const dispatch = useDispatch();

  useAllTweets(user?._id);  

  function handlePost(e) {
    setPost(e.target.value);
  }

  async function handleSubmit() {
    try {
      let res = await axios.post(
        `${TWEET_API_END_POINT}/create`,
        {description: post,id: user?._id},
        {headers: {"Content-Type":"application/json"}, withCredentials: true}
      );            
      if(res.data.success)
        toast.success(res.data.message);      
      dispatch(getRefresh());
      setPost('');
    } catch (error) {      
      toast.error(error.response.data.message);      
    }
  }

  function handleForYou() {
    dispatch(getIsActive(true));
  }

  function handleFollowing() {
    dispatch(getIsActive(false));
  }

  return (
    <div className='w-[100%]'>
      <div>
        <div className='flex items-center justify-between border-b border-gray-200'>
          <div className={`${isActive ? "border-b border-blue-300" : null} cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3`} onClick={handleForYou}>
            <h1 className='font-bold text-gray-600 text-lg'>For You</h1>
          </div>
          <div className={`${isActive ? null : "border-b border-blue-300"} cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3`} onClick={handleFollowing}>
            <h1 className='font-bold text-gray-600 text-lg'>Following</h1>
        </div>
        </div>
        <div>
          <div className='flex items-center p-4'>
            <Avatar src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" size="50" round={true} />
            <input type="text" value={post} onChange={handlePost} placeholder='What is happening?!' className='w-full outline-none border-none text-lg ml-2' />
          </div>
          <div className='flex items-center justify-between border-b border-gray-300 my-4 p-4'>
            <FaRegFileImage />
            <button className='bg-[#1D9BF0] px-4 py-1 rounded-full' onClick={handleSubmit}>Post</button>
          </div>
        </div>
      </div>
    </div>
  )
}
