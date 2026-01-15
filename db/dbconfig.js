const {Sequelize}=require('sequelize')
require('dotenv').config()

databaseURL=process.env.DATABASE_URL

const sequelize = new Sequelize(databaseURL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

const connectedDb=async()=>{
  try{
     //  IMPORTANT — load models & relations FIRST
    require("../model"); // association file
    await sequelize.authenticate()

    
    console.log("Connection has been established sucessfully")
    await sequelize.sync({force:false})
    console.log("Database synced");
  }
  catch(error){
    console.error("Unable to connect to the database:",error)
  }
}

module.exports = {connectedDb,sequelize};