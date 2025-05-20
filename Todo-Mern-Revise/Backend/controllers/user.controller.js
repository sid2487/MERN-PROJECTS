import User from "../model/user.model.js";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { genrateTokenAndSaveInCookie } from "../jwt/token.js";

const userSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    username: z.string().min(3, { message: "Username must be atleast 3 character long"}),
    password: z.string().min(6, { message: "Password must be atleast 6 character long" }),
});

export const register = async (req, res) => {
    // console.log("User is registerd....");

    try {
        const { username, email, password } = req.body;
        if(!username || !email || !password){
            return res.status(400).json({ message: "All fields are required" });
        }

        const validation = userSchema.safeParse({ username, email, password });
        if(!validation.success){
            const errorMessage = validation.error.errors.map((err) => err.message);
            return res.status(400).json({ errors: errorMessage });
        }

        const user = await User.findOne({ email });
        if(user) {
            return res.status(400).json({ errors: "User already exist" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ email, username, password: hashPassword });
        await newUser.save();

        if(newUser){
            const token = await genrateTokenAndSaveInCookie(newUser._id, res);
            res.status(201).json({ message: "User registered Successfully", token, newUser });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error in registration, try again" });
    }

}

export const login = async (req, res) => {
    // console.log("User is logged in....");

    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email }).select("+password");
        if(!user || !(await bcrypt.compare(password, user.password))){
            return res.status(400).json({ message: "Invalid email or password "});
        }

        const token = await genrateTokenAndSaveInCookie(user._id, res);

        res.status(201).json({ message: "Logged in Successfully", token, user });

    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error in Login" })
    }
};

export const logout = (req, res) => {
    try {
        res.clearCookie("jwt", {
            path: "/"
        });
        res.status(200).json({ message: "User loggedout Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error logging out User" });
    }
}