const { createJob, getAllJob, getaJob, updatJob, deleteJob } = require("../controller/jobController")
const isAuthenticated = require("../middleware/userMiddleware")

const Router=require("express").Router()

Router.post("/createjob",isAuthenticated,createJob)
Router.get("/getAllJob",getAllJob)
Router.get("/getaJob/:id",getaJob)
Router.patch("/updateJob/:id",updatJob)
Router.delete("/deleteJob/:id",deleteJob)


module.exports=Router