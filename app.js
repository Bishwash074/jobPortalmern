const express=require('express')
const { connectedDb } = require('./db/dbconfig')

const app=express()
// defining languages for express
app.use(express.json())
connectedDb();
const userRoute = require('./routes/userRoutes');
const  jobRoute=require('./routes/jobRoutes')

// connecting routes
app.use("/api/user",userRoute)
app.use("/api/job",jobRoute)

app.listen(3000,()=>{ 
  console.log("Server is running on port 3000")
})
