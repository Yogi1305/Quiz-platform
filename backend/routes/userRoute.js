import express from "express"
import { Admin, checklogging, login, logout, register } from "../controller/userController.js";
import { isloggedin } from "../middleware/isLoggedin.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router=express.Router();
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(isloggedin,logout);
router.route("/checklogged").get(isloggedin,checklogging);
router.route("/isadmin").get(isAdmin,Admin);
export default router;