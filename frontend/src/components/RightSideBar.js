import { CiSearch } from "react-icons/ci";
import WhoToFollow from "./WhoToFollow";

export default function RightSideBar() {
    return <>
        <div className="w-[25%]">
            <div className="flex items-center bg-gray-100 p-2 rounded-full">
                <CiSearch size="20px"/>
                <input type="text" placeholder="Search" className="bg-transparent outline-none px-2" />
            </div>
            <WhoToFollow />
        </div>
    </> 
}