import express from "express";
import { addQuestion, createContest, getallcontest} from "../controller/contestControllers.js";
import { isloggedin } from "../middleware/isLoggedin.js";
import {isAdmin} from "../middleware/isAdmin.js"
import { saveAnswer } from "../controller/quizController.js";


const router=express.Router();


router.route("/createcontest").post(isloggedin,isAdmin,createContest);
router.route("/addQuestion").post(isloggedin,isAdmin,addQuestion)
// router.route("/addQuestion").post(addQuestion)
router.route("/getcontest").get(isloggedin,getallcontest);
// router.route("/getcontest").get(getallcontest);
router.route("/answer").post(isloggedin,saveAnswer)
export default router