const jwt = require("jsonwebtoken");
const { User } = require('../model');
// middleware to check if the user is authenticated
const isAuthenticated = async (req, res, next) => {
  // token receive
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  // REMOVE "Bearer "
  const token = authHeader.split(" ")[1];
  console.log("TOKEN RECEIVED:", token);

  try {
    // token verify
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log("DECODED:", decoded);
    // Check if user still exists
    const doesUserExist = await User.findByPk(decoded.userId)
    console.log(doesUserExist)
    if (!doesUserExist) {
      return res.status(400).json({
        message: "The user belonging to this token does no longer exist."
      })
    }
    // Attach user data to request object
    req.user = doesUserExist
    next();
  } catch (error) {
    console.log("JWT ERROR:", error.message);
    return res.status(401).json({
      message: "Invalid or expired token."
    });
  }

  // next
}

//check user role

const checkUserRole = (...roles) => {// rest operator =>Rest operator allows a function to accept an indefinite number of argument 
  return (req, res, next) => {
    const role = req.user.role
    console.log(role)
    if (!roles.includes(role)) {
      return res.status(400).json({
        message: "Unauthorized acess- role mismatch"
      })
    }
    next()
  }
}

module.exports = {
  isAuthenticated,
  checkUserRole
};