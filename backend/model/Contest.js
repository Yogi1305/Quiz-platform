import mongoose from "mongoose"
import { QuestionModel } from "./Question.js";

const ContestModel=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    QuestionSet:[]
})

export const Contest=mongoose.model("Contest",ContestModel);