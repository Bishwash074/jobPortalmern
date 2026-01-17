const { where } = require("sequelize");
const { Application } = require("../model");

const jobApply = async (req, res) => {
  const { jobId } = req.params;
  const userId = req.user.id;

  const application = await Application.create({
    jobId: jobId,
    userId: userId
  })

  return res.status(200).json({
    messsage: "job applied sucessfully",
    application
  })
}


const updateApplicationStatus = async (req, res) => {
  const { id } = req.params
  const { status } = req.body
  const application = await Application.findByPk(id)

  if (!application) {
    return res.status(400).json({
      messsage: "Application not found"
    })
  }

  const updateApplication = await Application.update({
    status: status
  },{
where:{id}})

  return res.status(200).json({
    messsage: "Application status updated sucessfully",
    updateApplication
  })
}

const deleteApplication = async (req, res) => {
  const { id } = req.params;
  const application = await Application.findByPk(id);

  if (!application) {
    return res.status(404).json({
      message: "Application not found"
    })
  }

  await Application.destroy({where:{
    id
  }})
  return res.status(200).json({
    message: "Application deleted successfully",

  });
}

const getApplication = async (req, res) => {
  const application=await Application.findAll();

  if (!application){
    return res.status(404).json({
      message:"Application not found"
    })
  }
  return res.status(200).json({
    message:"All application are sucesfully given"
  })
}

const myApplication=async(req,res)=>{
  const userId=req.user.id

  const application=await Application.findAll({where:{
    userId:userId
  }})
  if(!application){
    return res.status(404).json({
      message:"Application not found"
    })
  }
  return res.status(200).json({
    message:"My application fetched successfully",
    application
  })
}

module.exports = { jobApply, updateApplicationStatus, deleteApplication,getApplication,myApplication }