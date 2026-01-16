const { Application } = require("../model");

const jobApply=async(req,res)=>{
  const {jobId}=req.params;
  const userId=req.user.id;

  const application=await Application.create({
    jobId:jobId,
    userId:userId
  })

  return res.status(200).json({
    messsage:"job applied sucessfully",
    application
  })
}


const updateApplicationStatus=async(req,res)=>{
  const {id}=req.params
  const {status}=req.body
  const application=await Application.findByPk(id)

  if(!application){
    return res.status(400).json({
      messsage:"Application not found"
    })
  }

  const updateApplication=await Application.update({
    status:status
  })

  return res.status(200).json({
    messsage:"Application status updated sucessfully",
    updateApplication
  })
}

const deleteApplication=async (req,res)=>{
  const {id}=req.params;
  const application=await Application.findByPk(id);

  if(!application){
    return res.status(404).json({
      message:"Application not found"
    })
  }

  const deletedapplication=await Application

}

module.exports={jobApply,updateApplicationStatus,deleteApplication}