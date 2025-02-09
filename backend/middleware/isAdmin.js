

import { User } from "../model/User.js";

export const isAdmin = async (req, res, next) => {
  try {
  
    const { userId } = req.id;

    

    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  //  console.log(user);
   
    // Check if the user is an admin
    if (user.isAdmin) {
      return next(); 
    } else {
      return res.status(403).json({ message: "You are not an admin" });
    }
  } catch (error) {
    console.error("Error in isadmin middleware:", error);
    return res.status(500).json({ message: "Server error, please try again later" });
  }
};
