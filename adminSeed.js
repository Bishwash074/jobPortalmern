const User = require("./model/UserModel");
const bcrypt = require("bcryptjs");

const seedAdminUser = async () => {
  try {
    const userAdmin = await User.findOne({
      where: { email: process.env.ADMIN_EMAIL }
    });

    if (userAdmin) {
      console.log("Admin user already exists");
      return;
    }

    await User.create({
      name: "JobProvider",
      email: process.env.ADMIN_EMAIL,
      password:  bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10),
      role: "jobprovider"
    });

    console.log("Admin user created successfully");
  } catch (error) {
    console.error("Admin seed error:", error.message);
  }
};

module.exports = seedAdminUser;
