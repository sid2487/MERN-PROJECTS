import streamifier from "streamifier"
import { cloudinary } from "../config/cloudinary.js";
import { User } from "../models/user.model.js";

export const uploadUserData = async (req, res) => {
    try {
        const { firstName, lastName, email } = req.body;
        const file = req.file;

        if(!firstName || !lastName || !email){
            return res.status(400).json({ error: "All fields are required"})
        }

        // step:1 file presence check
        if(!file) {
            return res.status(400).json({ error: "No file Uploaded" });
        }

        // step:2 allowed file types
        const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        if(!allowedTypes.includes(file.mimetype)) {
            return res.status(400).json({ error: "Invalid file type" });
        }

        // step:3 upload buffer to cloudinary using stream
        const streamUpload = () => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {resource_type: 'auto'},
                    (error, result) => {
                        if(result) resolve(result);
                        else reject(error);
                    }
                )
                streamifier.createReadStream(file.buffer).pipe(stream);
            });
        };

        const result = await streamUpload();

        const user = await User.create({ 
            firstName, 
            lastName, 
            email, 
            url: result.secure_url,
            public_id: result.public_id,
        
        });
        

        // step:4 send cloudinary result
        res.status(200).json({
            firstName,
            lastName,
            email, 
            message: "File uploaded successfully",
            url: result.secure_url,
            public_id: result.public_id
        })

    } catch (error) {
        console.error("Failed to Upload the data", error);
        res.status(500).json({ errors: "Failed to upload data" });
    }  
}


export const fetchUserData = async (req, res) => {
    try {
        const users = await User.find();
        if(!users) {
            return res.status(400).json({ error: "User not Found" });
        }
        res.status(200).json({ users });
    } catch (error) {
        console.error("Failed to Fetch data", error);
        res.status(500).json({ error: "Failed to Fetch data" });
    }
}