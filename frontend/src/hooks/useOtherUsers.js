import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constants';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getOtherUsers } from '../redux/userSlice';

const useOtherUsers = (id) => {
    const dispatch = useDispatch();
    useEffect(() => {    
        let getOtherUser = async() => {
            try {
                const res = await axios.get(`${USER_API_END_POINT}/otherProfiles/${id}`,{
                    withCredentials: true
                })                           
                dispatch(getOtherUsers(res?.data?.data));
            } catch(error) {
                console.log(error);
            }
        }     
        getOtherUser();       
    },[])
}

export default useOtherUsers;