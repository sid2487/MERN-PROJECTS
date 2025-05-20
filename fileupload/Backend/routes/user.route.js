import express from "express"
import { fetchUserData, uploadUserData } from "../controllers/user.controller.js";
import multer from "multer";

const router = express.Router();

// setup multer in route
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", upload.single('selectedFile'), uploadUserData);
router.get("/fetch", fetchUserData);

export default router;