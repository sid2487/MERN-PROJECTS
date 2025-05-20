import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.route.js"
import cors from "cors";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    // credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    // allowedHeaders: ["Content-Type", "Authorization"]
}))



app.use("/api/v1/", userRoutes);

const PORT = process.env.PORT || 4001

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})
