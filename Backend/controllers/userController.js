import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}


const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;
        const user = await userModel.findOne({ email: email.toLowerCase() })
        if (!user) {
            return res.json({ message: "Invalid credentials", success: false })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            const token = createToken(user._id)
            return res.json({ success: true, token })
        } else {
            return res.json({ message: "Invalid credentials", success: false })
        }


    } catch (error) {
        console.log(error);
        res.json({ message: "Something went wrong", success: false })
    }

}



const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        // Checking user existence
        const exists = await userModel.findOne({ email: email.toLowerCase() })
        if (exists) {
            return res.json({ message: "User already exists", success: false })
        }


        // vlidating email format and string passwrod
        if (!validator.isEmail(email)) {
            return res.json({ message: "Invalid email format", success: false })
        }
        if (password.length < 6) {
            return res.json({ message: "Please enter strong password", success: false })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name, email: email.toLowerCase(), password: hashedPassword
        })

        const user = await newUser.save();
        const token = createToken(user._id)

        res.json({ success: true, token })


    } catch (error) {
        console.log(error);
        res.json({ message: "Something went wrong", success: false })
    }

}



const adminLogin = async (req, res) => {

    try {
        
        const {email,password} = req.body;
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password,process.env.JWT_SECRET);
            return res.json({ success: true, token });
        } else {
            return res.json({ message: "Invalid credentials", success: false });
        }

    } catch (error) {
        console.log(error);
        res.json({ message: "Internal server error", success: false });
    }

}




export { loginUser, registerUser, adminLogin };