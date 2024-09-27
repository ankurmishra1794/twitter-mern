import React from 'react'
import Avatar from 'react-avatar';
import { FaRegCommentDots } from "react-icons/fa";
import { IoBookmarksOutline } from "react-icons/io5";
import useAllTweets from '../hooks/useAllTweets';
import { useSelector } from 'react-redux';
import DeleteTweet from './DeleteTweet';
import LikeDislike from './LikeDislike';

export default function Tweet() {    
    let { user } = useSelector(store => store.user);    
    let { allTweets } = useSelector(store => store.tweet);
    
    useAllTweets(user?._id);        

    return <>
        {allTweets?.map(tweet => {
            return <div className='flex p-4'>
                <Avatar src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png" size="50" round={true} />
                <div className='ml-2 w-full'>
                    <div className='flex items-center'>
                        <h1 className='font-bold'>{tweet?.userDetail[0]?.name}</h1>
                        <p className='text-gray-500 text-sm ml-2'>@{tweet?.userDetail[0]?.username} . 1m</p>
                    </div>
                    <div>
                        <p>{tweet?.description}</p>
                    </div>
                    <div className='flex justify-between my-1'>
                        <div className='flex items-center '>
                            <div className='hover:bg-green-200 p-2 rounded-full cursor-pointer'>
                                <FaRegCommentDots />
                            </div>
                            <p>0</p>
                        </div>
                        <LikeDislike tweet={tweet} />                    
                        <div className='flex items-center'>
                            <div className='hover:bg-green-200 p-2 rounded-full cursor-pointer'>
                                <IoBookmarksOutline />
                            </div>
                            <p>0</p>
                        </div>
                        {tweet?.userId === user?._id && <DeleteTweet tweetId={tweet?._id}/>}
                    </div>
                </div>
            </div>
        })
        }
    </>
}
