import express from "express";
import { addQuestion, createContest, getallcontest} from "../controller/contestControllers.js";
import { isloggedin } from "../middleware/isLoggedin.js";
import {isAdmin} from "../middleware/isAdmin.js"
import { saveAnswer } from "../controller/quizController.js";
import { getQuizResult } from "../controller/winner.js";


const router=express.Router();


router.route("/createcontest").post(isloggedin,isAdmin,createContest);
router.route("/addQuestion").post(isloggedin,isAdmin,addQuestion)

router.route("/getcontest").get(isloggedin,getallcontest);

router.route("/answer").post(isloggedin,saveAnswer)
router.route("/getwinner").post(getQuizResult)
export default router