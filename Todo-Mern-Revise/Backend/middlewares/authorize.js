import jwt, { decode } from "jsonwebtoken"
import User from "../model/user.model.js"

export const authenticate = async (req, res, next) => {
    const token = req.cookies.jwt;

    if(!token){
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decoded.userId); 
        // meaning of line 12
        // req.user = {
        //     _id: "65e123abc456...",
        //     username: "ayush_27",
        //     email: "ayush@example.com"
        // }
    } catch (error) {
        return res.status(401).json({ message: "" + error.message });
    }
    next();
};