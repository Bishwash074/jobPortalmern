const { createJob } = require("../controller/jobController")

const Router=require("express").Router()

Router.post("/createjob",createJob)

module.exports=Router