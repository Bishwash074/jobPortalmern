
// const {registerUser} = require("c./Controller/userController");

const { registerUser, loginUser } = require("../controller/userController");
const isAuthenticated = require("../middleware/userMiddleware");
const { asyncError } = require("../services/asyncFunction");

const Router = require("express").Router();


Router.post("/register",asyncError(registerUser));
Router.post("/login",asyncError(loginUser))


module.exports = Router;