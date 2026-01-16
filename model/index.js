const User=require("../model/UserModel")

const Job=require("../model/jobModal");
const Application = require("./applicationModel");

// Relationships between User and Job
User.hasMany(Job,{foreignKey:"userId"});
Job.belongsTo(User,{foreignKey:"userId"});

// Relationship between Application and User
User.hasMany(Application,{foreignKey:"userId"});
Application.belongsTo(User,{foreignKey:"userId"})

// realationship between Application and Job
Job.hasMany(Application,{foreignKey:'jobId'})
Application.belongsTo(Job,{foreignKey:'jobId'})


module.exports={User,Job,Application}