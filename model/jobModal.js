const {DataTypes}=require('sequelize')

const {sequelize}=require('../db/dbconfig')

const Job=sequelize.define("Job",{
  id:{
    type:DataTypes.UUID,
    primaryKey:true,
    defaultValue: DataTypes.UUIDV4
  },
  title:{
    type:DataTypes.STRING,
    allowNull:false
  },
  description:{
    type:DataTypes.STRING,
    allowNull:false
  },
  location:{
    type:DataTypes.STRING,
    allowNull:false
  },
  salary:{
    type:DataTypes.STRING,
    allowNull:true
  }
})

module.exports=Job