import express from "express"
import { checklogging, login, logout, register } from "../controller/userController.js";
import { isloggedin } from "../middleware/isLoggedin.js";

const router=express.Router();
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(isloggedin,logout);
router.route("checklogged").get(isloggedin,checklogging);

export default router;