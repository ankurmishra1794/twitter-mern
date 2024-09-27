import Avatar from 'react-avatar';
import { useSelector } from 'react-redux';
import useOtherUsers from '../hooks/useOtherUsers';
import { Link } from 'react-router-dom';

export default function WhoToFollow() {
    let { user, otherUsers } = useSelector(store => store.user);
    useOtherUsers(user?._id);
    return <div className="bg-gray-100 p-4 rounded-2xl my-4">
        <h1 className="font-bold text-lg">Who to follow</h1>
        {otherUsers?.map(user => {
            return <div key={user?._id} className="flex items-center justify-between my-3">
                <div className="flex items-center">
                    <Avatar src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png" size="50" round={true} />
                    <div className="ml-2">
                        <h1 className="font-bold">{user?.name}</h1>
                        <p className="text-sm">@{user?.username}</p>
                    </div>
                </div>
                <Link to={`/profile/${user?._id}`}>
                    <button className="bg-black text-white rounded-full px-3 py-1">Profile</button>
                </Link>                
            </div>
        })}
    </div>
}