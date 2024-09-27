import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constants';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getMyProfile } from '../redux/userSlice';

const useProfile = (id) => {    
    const dispatch = useDispatch();
    useEffect(() => {    
        let getProfile = async() => {
            try {
                const res = await axios.get(`${USER_API_END_POINT}/profile/${id}`,{
                    withCredentials: true
                })                           
                dispatch(getMyProfile(res.data.data));
            } catch(error) {
                console.log(error);
            }
        }     
        getProfile();       
    },[id])
}

export default useProfile;