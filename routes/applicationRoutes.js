const { jobApply, updateApplicationStatus } = require('../controller/applicationController');
const { isAuthenticated, checkUserRole } = require('../middleware/userMiddleware');
const { asyncError } = require("../services/asyncFunction");
const router=require('express').Router();

router.post('/applications/:jobId',asyncError(jobApply))
router.patch("/aplicationupdate/:id",isAuthenticated,checkUserRole("jobprovider"),asyncError(updateApplicationStatus))
router.delete("/applicationdelete/:id")

module.exports=router;