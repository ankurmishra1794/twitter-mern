import express from 'express';
import { allTweets, createTweet, deleteTweet, followingTweets, likeOrDislike } from '../controllers/tweetController.js';
import isAuthenticated from "../config/auth.js";

const router = express.Router();

router.route("/create").post(isAuthenticated,createTweet);
router.route("/delete/:id").delete(isAuthenticated,deleteTweet);
router.route("/like/:id").put(isAuthenticated,likeOrDislike);
router.route("/allTweets/:id").get(isAuthenticated,allTweets);
router.route("/followingTweets/:id").get(isAuthenticated,followingTweets);

export default router;