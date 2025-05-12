import express from "express";
import { homePage } from "../controllers/home.controller.js";
import { userMiddleware } from "../middlewares/user.middleware.js";

const router = express.Router();

router.get("/homepage", homePage);

export default  router;