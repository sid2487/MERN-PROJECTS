import config from "../config.js";
import jwt from "jsonwebtoken";

function userMiddleware(req, res, next){
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({ errors: "unauthorized user" });
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, config.JWT_USER_PASSWORD);
    } catch (error) {
        
    }
}