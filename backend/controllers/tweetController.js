import { Tweet } from "../models/tweetSchema.js";
import { User } from "../models/userSchema.js";

export const createTweet = async(req,res) => {
    try {
        const { description,id } = req.body;
        if(!description || !id) {
            res.status(401).json({
                message: "Fields are required.",
                success: false
            });
        }
        let user = await User.findById(id).select("-password");
        
        await Tweet.create({
            description,
            userId:id,
            userDetail:user
        })  
        res.status(201).json({
            message: "Tweet created successfully",
            success: true
        });      
    } catch (error) {
        console.log(error);
    }    
}

export const deleteTweet = async(req,res) => {
    try {
        const {id} = req.params;
        await Tweet.findByIdAndDelete(id);
        res.status(200).json({
            message: "Tweet deleted successfully.",
            status: true
        });
    } catch(error) {
        console.log(error);
    }  
}

export const likeOrDislike = async(req,res) => {
    try {
        const loggedInId = req.body.id;
        const tweetId = req.params.id;
        const tweet = await Tweet.findById(tweetId);        
        if(tweet.like.includes(loggedInId)) {
            await Tweet.findByIdAndUpdate(tweetId,{$pull: {like: loggedInId}});
            res.status(200).json({
                message: "User disliked your tweet"                
            });
        } else {
            await Tweet.findByIdAndUpdate(tweetId,{$push: {like: loggedInId}});
            res.status(200).json({
                message: "User liked your tweet"                
            });
        }        
    } catch(error) {
        console.log(error);
    }
}

export const allTweets = async(req,res) => {
    try {
        const loggedInId = req.params.id;
        const loggedInUserTweets = await Tweet.find({userId: loggedInId});
        const logggedInUser = await User.findById(loggedInId);
        const followingUserTweets = await Promise.all(logggedInUser.following.map(id => Tweet.find({userId: id})));                        
        res.status(200).json({
            message: "done",
            data: loggedInUserTweets.concat(...followingUserTweets),
            status: true
        });
    } catch(error) {
        console.log(error);
    }    
}

export const followingTweets = async(req,res) => {
    try {
        const loggedInId = req.params.id;        
        const logggedInUser = await User.findById(loggedInId);
        const followingUserTweets = await Promise.all(logggedInUser.following.map(id => Tweet.find({userId: id})));                       
        res.status(200).json({
            message: "done",
            data: [].concat(...followingUserTweets),
            status: true
        });
    } catch(error) {
        console.log(error);
    }    
}