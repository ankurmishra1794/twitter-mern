import { IoMdHome } from "react-icons/io";
import { CiHashtag } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "../utils/constants";
import axios from "axios";
import toast from "react-hot-toast";
import { getUser } from "../redux/userSlice";

export default function LeftSideBar() {
    const {user} = useSelector(store=>store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function handleLogout() {
        try {
            let res = await axios.get(`${USER_API_END_POINT}/logout`);            
            res.data.status && toast.success(res.data.message);
            dispatch(getUser(null));
            navigate('/login');               
        } catch (error) {
            console.log(error);            
        }        
    }

    return <div className="w-[20%]">
        <div>
            <img width={'60px'} src="https://static.dezeen.com/uploads/2023/07/x-logo-twitter-elon-musk_dezeen_2364_col_0-1-852x479.jpg"></img>
        </div>
        <div className="my-4">
            <Link to={'/home'} className="flex items-center my-2 py-1 px-1 hover:bg-gray-100 rounded-full hover:cursor-pointer">
                <div>
                    <IoMdHome size="28px"/>
                </div>
                <h1 className="font-bold text-lg ml-2">Home</h1>
            </Link>
            <div className="flex items-center my-2 py-1 px-1 hover:bg-gray-100 rounded-full hover:cursor-pointer">
                <div>
                    <CiHashtag size="28px"/>
                </div>
                <h1 className="font-bold text-lg ml-2">Explore</h1>
            </div>
            <div className="flex items-center my-2 py-1 px-1 hover:bg-gray-100 rounded-full hover:cursor-pointer">
                <div>
                    <IoIosNotificationsOutline size="28px"/>
                </div>
                <h1 className="font-bold text-lg ml-2">Notifications</h1>
            </div>
            <Link to={`/profile/${user?._id}`} className="flex items-center my-2 py-1 px-1 hover:bg-gray-100 rounded-full hover:cursor-pointer">
                <div>
                    <FaRegUser size="28px"/>
                </div>
                <h1 className="font-bold text-lg ml-2">Profile</h1>
            </Link>
            <div className="flex items-center my-2 py-1 px-1 hover:bg-gray-100 rounded-full hover:cursor-pointer">
                <div>
                    <CiBookmark size="28px"/>
                </div>
                <h1 className="font-bold text-lg ml-2">Bookmarks</h1>
            </div>
            <div className="flex items-center my-2 py-1 px-1 hover:bg-gray-100 rounded-full hover:cursor-pointer" onClick={handleLogout}>
                <div>
                    <IoIosLogOut size="28px"/>
                </div>
                <h1 className="font-bold text-lg ml-2">Logout</h1>
            </div>
            <button className="bg-[#1D9BF0] py-2 border-none text-md w-full rounded-full text-white font-bold">Post</button>
        </div>
    </div>
}