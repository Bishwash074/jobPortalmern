
// const {registerUser} = require("c./Controller/userController");

const { registerUser, loginUser, forgotPassword, verifyOtp, resetPassword } = require("../controller/userController");
const isAuthenticated = require("../middleware/userMiddleware");
const { asyncError } = require("../services/asyncFunction");

const Router = require("express").Router();


Router.post("/register",asyncError(registerUser));
Router.post("/login",asyncError(loginUser))
Router.post("/forgot-password",asyncError(forgotPassword))
Router.post("/verify-otp",asyncError(verifyOtp))
Router.post("/reset-password",asyncError(resetPassword))



module.exports = Router;