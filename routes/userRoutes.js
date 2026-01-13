
// const {registerUser} = require("c./Controller/userController");

const { registerUser, loginUser } = require("../controller/userController");
const isAuthenticated = require("../middleware/userMiddleware");

const Router = require("express").Router();


Router.post("/register", registerUser);
Router.post("/login",loginUser)


module.exports = Router;