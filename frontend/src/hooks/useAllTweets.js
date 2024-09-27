import axios from 'axios';
import { TWEET_API_END_POINT } from '../utils/constants';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTweets } from '../redux/tweetSlice';

const useAllTweets = (id) => {
    const dispatch = useDispatch();
    const {refresh, isActive} = useSelector(store => store.tweet);
    
    let handleAllTweets = async() => {
        try {
            const res = await axios.get(`${TWEET_API_END_POINT}/allTweets/${id}`,{
                withCredentials: true
            })                           
            dispatch(getAllTweets(res?.data?.data));
        } catch(error) {
            console.log(error);
        }
    }

    let handleFollowingTweets = async() => {
        try {
            const res = await axios.get(`${TWEET_API_END_POINT}/followingTweets/${id}`,{
                withCredentials: true
            })                           
            dispatch(getAllTweets(res?.data?.data));
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {    
        isActive ? handleAllTweets() : handleFollowingTweets();                       
    },[isActive, refresh])
}

export default useAllTweets;