const { where } = require("sequelize")
const Job = require("../model/jobModal")
const { User } = require("../model")

//create a job
const createJob=async(req,res)=>{
  
  const {title,description,location,salary,company}=req.body
  const userId=req.user.id
  if(!title||!description||!location||!company){
    return res.status(400).json({message:"Please provide all required fields"})
  }


 try{
   const job=await Job.create({
    title,
    description,
    location,
    salary,
    company,
    userId
    
  })
  // console.log(job)
  res.status(201).json({message:"Job created sucessfully",job})
 }
 catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
}
}


//get all the job
const getAllJob=async (req,res)=>{
  try {
    const jobs=await Job.findAll({
    include:{
      model:User,
      attributes:["id","name","email"]
    }
  }) //returns array

  if(jobs.length==0){
    return res.status(404).json({message:"No jobs found"})
  }
  res.status(200).json({
    message:"Jobs fetched sucessfully",
    data:jobs
  })
  } catch (error) {
    res.status(500).json({
      message:"Server error",error
    })
  }

}

//get a single job
const getaJob=async(req,res)=>{
  const id=req.params.id
  const singleJob=await Job.findByPk(id,{
    include:{
      model:User,
      attributes:["id","name","email"]
    }
    
  }) //return object

  if(!singleJob){
    return res.status(404).json({
      message:"Job not found"
    })
  }
  res.status(201).json({
    message:"Job found sucessfully",
    data:singleJob
  })
  

}

//update a job
const updatJob=async (req,res)=>{
  const id =req.params.id
  const{title,location,description,salary,}=req.body

  //Check if the job exist

  const job=await Job.findOne({where:{id}})

  if(!job){
    return res.status(404).json({
      message:"Job not found"
    })
  }

  await Job.update({
    title,
    description,
    location,
    salary,
  },{where:{id}})

  res.status(200).json({
      message: "Job updated successfully",
      data:job
    });


}

//delete a single job
const deleteJob=async (req,res)=>{
  const id=req.params.id

  const findjob=await Job.findOne({where:{id}})

  if(!findjob){
    return res.status(404).json({
      message:"Job not found"
    })
  }

  await Job.destroy({where:{id}})
  return res.status(201).json({message:"Job deleted sucessfully"})

}



module.exports={
  createJob,
  getAllJob,
  getaJob,
  updatJob,
  deleteJob
}