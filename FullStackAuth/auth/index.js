import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";

dotenv.config();
connectDB();


const app = express();
const PORT = process.env.PORT;

// middlewares
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello sachin");
});

app.use("/api/v1/user", userRoutes);

app.listen(PORT, ()  => {
    console.log(`Server is running on ${PORT}`);
})