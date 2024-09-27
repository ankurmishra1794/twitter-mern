import express from 'express';
import { Register,Login,Logout, bookmark, myProfile, otherProfiles, follow, unfollow } from '../controllers/userController.js';
import isAuthenticated from "../config/auth.js";

const router = express.Router();

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/logout").get(Logout);
router.route("/bookmark/:id").put(isAuthenticated,bookmark);
router.route("/profile/:id").get(isAuthenticated, myProfile);
router.route("/otherProfiles/:id").get(isAuthenticated, otherProfiles);
router.route("/follow/:id").put(isAuthenticated,follow);
router.route("/unfollow/:id").put(isAuthenticated,unfollow);

export default router;