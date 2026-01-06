const Job = require("../model/jobModal")

const createJob=async(req,res)=>{
  
  const {title,description,location,salary,userId}=req.body
  if(!title||!description||!location){
    return res.status(400).json({message:"Please provide all required fields"})
  }


 try{
   const job=await Job.create({
    title,
    description,
    location,
    salary,
    userId
    
  })
  console.log(job)
  res.status(201).json({message:"Job created sucessfully",job})
 }
 catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
}
}

module.exports={createJob}