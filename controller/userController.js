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

const forgotPassword = async (req, res) => {
    const email = req.body
    console.log("Forget password request for email:", email)

    try {
        const user = await User.findOne({ where: { email: email } })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        console.log("Otp genereated:", otp)

        user.otp = otp
        await user.save()

        await sendEmail({
            email,
            subject: "Password Reset OTP",
            message: `Your OTP for password reset is: ${otp}`,
        })
        return res.status(200).json({
            message: "OTP sent to email",
        });
    } catch (err) {
        console.error("Failed to process forgot password:", err.message);
        return res.status(500).json({ message: "Failed to send OTP" });
    }
}

// verify otp
exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body
    if (!email || !otp) {
        return res.status(400).json({
            message: "Please provider email,otp"
        })
    }
    const userExists = await User.findOne({ where: { userEmail: email } });
    console.log(userExists)
    if (!userExists) {
        return res.status(404).json({
            message: "Email is not registered"
        })
    }
    console.log(userExists[0].otp, otp)
    if (userExists[0].otp !== otp * 1) {

        res.status(400).json({
            message: "Invalid otp"
        })
    } else {
        // dispost the otp so cannot be used next time the same otp
        userExists[0].otp = undefined
        userExists[0].isOtpVerified = true
        await userExists[0].save()
        res.status(200).json({
            message: "Otp is correct"
        })
    }
}
exports.resetPassword = async (req, res) => {
    const { email, newPassword, confirmPassword } = req.body
    if (!email || !newPassword || !confirmPassword) {
        return res.status(400).json({
            message: "Please provide email,newPassword,confirmPassword"
        })
    }
    if (newPassword !== confirmPassword) {
        return res.status(400).json({
            message: "newPassword and confirmPassword doesn't match"
        })
    }

    const userExists = await User.find({ userEmail: email }).select("+isOtpVerified")
    if (userExists.length == 0) {
        return res.status(404).json({
            message: "User email not registered"
        })
    }
    console.log(userExists)
    if (userExists[0].isOtpVerified != true) {
        return res.status(403).json({
            message: "You cannot perform this action"
        })
    }

    userExists[0].userPassword = bcrypt.hashSync(newPassword, 10)
    userExists[0].isOtpVerified = false;

    await userExists[0].save()

    res.status(200).json({
        message: "Password changed successfully"
    })
}

module.exports = { registerUser, loginUser, forgotPassword}