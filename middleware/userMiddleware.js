const jwt = require("jsonwebtoken");

const isAuthenticated= async (req,res,next)=>{
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
  const decoded=jwt.verify(token,"process.env.JWT_SECRET")
   console.log("DECODED:", decoded);
  req.user=decoded.userId;
  console.log(req.user)
  next();
  } catch (error) {
    console.log("JWT ERROR:", error.message);
    return res.status(401).json({
      message: "Invalid or expired token."
    });
  }

  // next
}

module.exports = isAuthenticated;