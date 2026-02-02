const express = require('express');
const { connectedDb } = require('./db/dbconfig');
const userRoute = require('./routes/userRoutes');
const jobRoute = require('./routes/jobRoutes');
const applicationRoute=require('./routes/applicationRoutes')
const seedAdminUser = require('./adminSeed');
const cors = require("cors")

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect to frotend
app.use(cors({
  origin:"http://localhost:5173" //frotend Url
}))
require("dotenv").config();
// connect DB
connectedDb();

//  CALL SEED FUNCTION
seedAdminUser();

// routes
app.use("/api/user", userRoute);
app.use("/api/job", jobRoute);
app.use('/api/application',applicationRoute)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
