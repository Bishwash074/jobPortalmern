const express = require('express');
const { connectedDb } = require('./db/dbconfig');
const userRoute = require('./routes/userRoutes');
const jobRoute = require('./routes/jobRoutes');
const seedAdminUser = require('./adminSeed');

const app = express();

// middleware
app.use(express.json());

// connect DB
connectedDb();

// ✅ CALL SEED FUNCTION
seedAdminUser();

// routes
app.use("/api/user", userRoute);
app.use("/api/job", jobRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
