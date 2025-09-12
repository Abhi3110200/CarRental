import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "2d" });
}

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password || password.length < 8) {
            return res.status(400).json({success: false, message: "All fields are required" });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });

        const token = generateToken(user._id);
        console.log(token);

        res.status(201).json({success: true, token });

    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Something went wrong" });
    }
}

export const loginUser = async(req, res)=>{
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({success: false, message: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({success: false, message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({success: false, message: "Invalid password" });
        }

        const token = generateToken(user._id);
        console.log(token);
        res.status(200).json({success: true, token });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Something went wrong" });
    }
}

//Get User data using token (JWT)

export const getUserData = async(req, res)=>{
    try {
        const {user}=req;
        res.json({success: true, user});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Something went wrong" });
    }
}