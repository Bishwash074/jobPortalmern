const { jobApply, updateApplicationStatus, deleteApplication, getApplication, myApplication } = require('../controller/applicationController');
const { isAuthenticated, checkUserRole } = require('../middleware/userMiddleware');
const { asyncError } = require("../services/asyncFunction");
const router=require('express').Router();

router.post('/applicationcreate/:jobId',isAuthenticated,checkUserRole("jobseeker"),asyncError(jobApply))
router.patch("/aplicationupdate/:id",isAuthenticated,checkUserRole("jobprovider"),asyncError(updateApplicationStatus))
router.delete("/applicationdelete/:id",isAuthenticated,checkUserRole("jobseeker"),asyncError(deleteApplication))
router.get('/getapplication',isAuthenticated,checkUserRole("jobprovider"),asyncError(getApplication))
router.get("/myapplication",isAuthenticated,checkUserRole("jobseeker"),asyncError(myApplication))


module.exports=router;