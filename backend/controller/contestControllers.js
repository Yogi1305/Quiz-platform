import { Contest } from "../model/Contest.js";
import { QuestionModel } from "../model/Question.js";

// Create a new contest
export const createContest = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const newContest = await Contest.create({
      title,
      QuestionSet: [],
    });

    await newContest.save();

    return res.status(201).json({ message: "Contest is created successfully" });
  } catch (error) {
    console.error("Error in createContest controller:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Add question to a contest
export const addQuestion = async (req, res) => {
  try {
    const { Question, Options, Answer, ConstestId } = req.body;

    if (!Question || !Options || !Answer) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new question
    const newQuestion = await QuestionModel.create({
      Question,
      Options,
      Answer,
    });

    await newQuestion.save();

    const findContest = await Contest.findOne({ _id: ConstestId });

    if (!findContest) {
      return res
        .status(400)
        .json({ message: "No contest found for this user" });
    }

    findContest.QuestionSet.push(newQuestion);

    await findContest.save();

    return res.status(200).json({ message: "Question is added successfully" });
  } catch (error) {
    console.error("Error in addQuestion controller:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// get all constest

export const getallcontest = async (req, res) => {
  try {
    const contest = await Contest.find();
    if (contest.length === 0)
      return res.status(200).json({ message: "no contest" });
    return res.status(200).json({ contest });
  } catch (error) {
    console.log("error in getcontest in contestcontroller ", error);
  }
};

// get answer and store in user 
