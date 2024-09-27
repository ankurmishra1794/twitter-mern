import {User} from '../models/userSchema.js';
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const Register = async(req,res) => {
    try {
        const {name, username, email, password} = req.body;        
        if(!name || !username || !email || !password) {
            res.status(401).json({
                message: "All fields are required",
                success: false
            });
        }
        const user = await User.findOne({email});
        if(user) {
            res.status(401).json({
                message: "User already exist",
                success: false
            });
        }

        const hashedPassword = await bcryptjs.hash(password, 16);
        await User.create({name,username,email,password: hashedPassword});
        res.status(201).json({
            message: "Account created successfully.",
            success: true
        });
    } catch(error) {
        console.log(error);       
    }
}

export const Login = async(req,res) => {
    try {
        const {email,password} = req.body;
        if(!email || !password) {
            res.status(401).json({
                message: "All fields are required.",
                success: false
            });
        }
        const user = await User.findOne({email});
        if(!user) {
            res.status(401).json({
                message: "wrong email or password.",
                success: false
            });
        } 
        const isMatch = await bcryptjs.compare(password,user.password);
        if(!isMatch) {
            res.status(401).json({
                message: "wrong email or password.",
                success: false
            });
        }
        let token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
        res.status(201).cookie("token",token,{"expiresIn":"1d", httpOnly: true}).json({
            message: `Welcome ${user.name}`,
            user,
            success: true
        });
    } catch(error) {
        console.log(error);
    }   
}

export const Logout = (req,res) => {
    res.cookie("token","",{expiresIn: new Date(Date.now())}).json({
        message: "User logged out successfully",
        success: true
    });
}

export const bookmark = async(req,res) => {    
    try {
        const loggedInUserId = req.params.id;
        const tweetId = req.body.id;        
        const user = await User.findById(loggedInUserId);        
        if(user.bookmarks.includes(tweetId)) {
            await User.findByIdAndUpdate(loggedInUserId, {$pull: {bookmarks: tweetId}});
            res.status(200).json({
                message: "Bookmarked tweet removed"                
            });
        } else {            
            await User.findByIdAndUpdate(loggedInUserId, {$push: {bookmarks: tweetId}});        
            res.status(200).json({
                message: "Tweet bookmarked"                
            });
        }        
    } catch(error) {
        console.log(error);
    }
}

export const myProfile = async(req,res) => {
    const loggedInId = req.params.id;
    const user = await User.findById(loggedInId).select('-password');
    res.status(200).json({
        message: "Profile fetched successfully",
        data: user,
        success: true
    });
}

export const otherProfiles = async(req,res) => {
    try {
        const loggedInId = req.params.id;
        const users = await User.find({_id: {$ne: loggedInId}}).select('-password');
        if(users) {
            res.status(200).json({
                message: "Other profiles fetched successfully",
                data: users,
                success: true
            });
        } else {
            res.status(200).json({
                message: "no other users found",
                data: users,
                success: true
            });
        }
    } catch(error) {
        console.log(error);
    }    
}

export const follow = async(req,res) => {
    try {
        const LoggedInId = req.params.id;
        const followId = req.body.id;
        const logggedInUser = await User.findById(LoggedInId);
        const followUser = await User.findById(followId);
        if(followUser.followers.includes(LoggedInId)) {
            res.status(200).json({
                message: `${logggedInUser.name} already following ${followUser.name}`,
                status: true
            })
        }
        if(!followUser.followers.includes(LoggedInId)) {
            await followUser.updateOne({$push: {followers: LoggedInId}});
            await logggedInUser.updateOne({$push: {following: followId}});
            res.status(200).json({
                message: `Now ${logggedInUser.name} start following ${followUser.name}`,
                status: true
            })
        }
    } catch(error) {
        console.log(error);
    }    
}

export const unfollow = async(req,res) => {
    try {
        const loggedInId = req.params.id;
        const followedId = req.body.id;
        const logggedInUser = await User.findById(loggedInId);
        const followedUser = await User.findById(followedId);
        if(followedUser.followers.includes(loggedInId)) {
            await followedUser.updateOne({$pull: {followers: loggedInId}});
            await logggedInUser.updateOne({$pull: {following: followedUser}});
            res.status(200).json({
                message: `Now ${logggedInUser.name} unfollowed ${followedUser.name}`,
                status: true
            })
        }
        if(!followedUser.followers.includes(loggedInId)) {            
            res.status(200).json({                
                message: `${logggedInUser.name} already unfollowed ${followedUser.name}`,
                status: true
            })
        }
    } catch(error) {
        console.log(error);
    }    
}