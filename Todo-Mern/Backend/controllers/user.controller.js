import User from "../model/user.model.js";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { generateTokenAndSaveInCookie } from "../jwt/token.js";

const userSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    username: z.string().min(3, { message: "Username must be 3 Character long" }),
    password: z.string().min(6, { message: "Password must be atleast 6 characters long" }),
})

export const register = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        if(!email || !username || !password){
            return res.status(400).json({ errors: "All Fields are required" });
        }

        const validation = userSchema.safeParse({ email, username, password })
        if(!validation.success){
            // return res.status(400).json(({ errors: validation.error.errors }));
            const errorMessage = validation.error.errors.map((err) => err.message)
            return res.status(400).json({ errors: errorMessage });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ errors: "User already exist" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ email, username, password: hashPassword });
        await newUser.save();
        if (newUser) {
            const token = await generateTokenAndSaveInCookie(newUser._id, res);
            res.status(201).json({ message: "User registerd successfully", newUser, token });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error registering User" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if(!email || !password){
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email }).select("+password")
        if(!user || !(await bcrypt.compare(password, user.password))){
            return res.status(400).json({ errors: "Invalid email or password" });
        }

        const token = await generateTokenAndSaveInCookie(user._id, res);
    
        res.status(200).json({ message: "User logged in Successfully", user, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error logging User"});
    }
}

export const logout = (req, res) => {
    try {
        res.clearCookie("jwt", {
            path: "/"
        });
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error logging out User" });
    }
}