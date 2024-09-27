import React from 'react'
import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";
import axios from 'axios';
import toast from 'react-hot-toast';
import { getRefresh } from '../redux/tweetSlice';
import { TWEET_API_END_POINT } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';

export default function LikeDislike({tweet}) {
    let {user} = useSelector(store => store.user);
    let dispatch = useDispatch();
    async function handleLikeDislike(tweetId) {
        try {
            let  res = await axios.put(
                `${TWEET_API_END_POINT}/like/${tweetId}`,
                {id: user?._id},
                {headers: {
                    "Content-Type":"application/json"
                    }, 
                    withCredentials: true
                 }
            );    
            dispatch(getRefresh());            
            toast.success(res.data.message);
        } catch (error) {            
            toast.error(error.response.data.message);
        }        
    }

  return (
    <div className='flex items-center'>
        <div className='hover:bg-green-200 p-2 rounded-full cursor-pointer' onClick={e => handleLikeDislike(tweet?._id)}>
            {tweet?.like.includes(user?._id) ? <FcLike /> : <FcLikePlaceholder />}                              
        </div>
        <p>{tweet?.like.length}</p>
    </div>
  )
}
