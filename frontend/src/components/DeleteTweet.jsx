import axios from 'axios';
import React from 'react'
import { MdDelete } from "react-icons/md";
import { TWEET_API_END_POINT } from '../utils/constants';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { getRefresh } from '../redux/tweetSlice';

export default function DeleteTweet({tweetId}) {
  let dispatch = useDispatch();
  async function handleDelete(tweetId) {
    try {
      let res = await axios.delete(
        `${TWEET_API_END_POINT}/delete/${tweetId}`,
        {headers: {"Content-Type":"application/json"}, withCredentials: true}
      );
      toast.success(res.data.message);
      dispatch(getRefresh());
    } catch (error) {
      toast.error(error.response.data.message);
    }    
  }

  return (
    <div className='flex items-center'>
      <div className='hover:bg-red-200 p-2 rounded-full cursor-pointer' onClick={e => handleDelete(tweetId)}>
        <MdDelete size={18}/>
      </div>                            
    </div>
  );
}
