import { User } from "../model/User.js";

export const isAdmin = async (req, res, next) => {
  try {
    // Get userId from the correct location
    // Typically, the authentication middleware sets this in req.user or directly in req
    const userId = req.headers['x-user-id'];

    // Check if userId exists
    if (!userId) {
      console.log("No userId found in request:", req.user, req.userId);
      return res.status(401).json({ 
        success: false, 
        message: "Authentication required. Please log in." 
      });
    }

    // Find the user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }
   
    // Check if the user is an admin
    if (user.isAdmin) {
      return next(); 
    } else {
      return res.status(403).json({ 
        success: false,
        message: "You are not an admin"
      });
    }
  } catch (error) {
    console.error("Error in isadmin middleware:", error);
    return res.status(500).json({ 
      success: false,
      message: "Server error, please try again later" 
    });
  }
};