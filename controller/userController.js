const User = require("../model/UserModel");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    //console.log(req.body)


    // const name = req.body.name
    // const email= req.body.email
    // const password= req.body.password
    // const role= req.body.role


    const existingUser = await User.findOne({ where: { email: email } })

    if (existingUser) {
        return res.status(400).json({ message: "User already exists with this email" })
    }
    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }


}
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Please provide email and password" })
    }

    const user = await User.findOne({ where: { email } })
    if (!user) {
        return res.status(400).json({ message: "Invalid email or password" })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid email or password" })
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    })

    res.status(201).json({
        message: "User sucessfully login",
        data: token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    })
}
module.exports = { registerUser, loginUser }