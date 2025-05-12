import config from "../config.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const userMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({ errors: "unauthorized user" });
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, config.JWT_USER_PASSWORD);
        console.log(decoded);
        // req.userId = await decoded.id;
        req.user = await User.findById(decoded.userId).select('-password');

        next();
    } catch (error) {
        return res.status(401).json({ errros: "Invalid token or expired" });
    }
}

