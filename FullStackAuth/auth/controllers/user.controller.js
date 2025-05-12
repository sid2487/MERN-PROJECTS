import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import config  from "../config.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    console.log( firstName, lastName, email, password )
    try {
        const user = await User.findOne({ email: email });
        if(user){
            return res.status(401).json({ errors: "User already Exist"})
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashPassword,
        });

        await newUser.save();
        return res.status(201).json({ message: "Successfully Signup"});
    } catch (error) {
        console.log("Error in signup: ", error)
        return res.status(500).json({ error: "Error in signup" });
    }
    
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });
        
        if(!user){
            return res.status(403).json({ errors: "Invalid Credentials" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(403).json({ errors: "Invalid Credentials" });
        }

        // jwt code
        const token = jwt.sign({ id: user._id}, config.JWT_USER_PASSWORD, {
            expiresIn: '1d',
        });
        const cookieOptions = {
            expires: new Date(Date.now()+24*60*60*1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict"
        }
        res.cookie("jwt", token, cookieOptions);

        return res.status(201).json({ message: "User logged in successfully", user, token });
    } catch (error) {
        console.error("Error in login", error);
        return res.status(500).json({ errors: "Error in login" });
    }
} 

export const logout = (req, res) => {
    try {
        res.clearCookie("jwt");
        res.status(200).json({ message: "Logged out successfully" })
    } catch (error) {
        console.error("Error in logout", error)
        res.status(500).json({ message: "Error in logout" })
    }
}
