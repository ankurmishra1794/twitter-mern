import CreatePost from "./CreatePost";
import Tweet from "./Tweet";
import LeftSideBar from "./LeftSideBar";
import RightSideBar from "./RightSideBar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Feed() {
    let {user} = useSelector(store=>store.user);
    let navigate = useNavigate();    
    
    useEffect(() => {
        if(!user) {            
            navigate("/login");
        }
    },[])    

    return <>
        <div className="flex justify-between w-[80%] mx-auto">
            <LeftSideBar />    
                <div className="w-[50%] border border-gray-200">
                    <CreatePost />
                    <Tweet />
                </div>
            <RightSideBar />
        </div>
    </>
}