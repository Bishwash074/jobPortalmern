const { DataTypes } = require("sequelize")

const { sequelize } = require("../db/dbconfig")

const User = sequelize.define("User", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM("jobseeker", "jobprovider"),
        defaultValue: "jobseeker",
        allowNull: false
    },
    otp: {
        type: DataTypes.STRING,
        allowNull: true
    },
    isOtpVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }

})


module.exports = User;