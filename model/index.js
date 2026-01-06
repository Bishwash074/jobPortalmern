const User=require("../model/UserModel")

const Job=require("../model/jobModal")

// Relationships between User and Job
User.hasMany(Job,{foreignKey:"userId"});
Job.belongsTo(User,{foreignKey:"userId"});

module.exports={User,Job}