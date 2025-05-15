import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import todoRoute from "../Backend/routes/todo.route.js";
import userRoute from "../Backend/routes/user.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5002;
const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: ["Content-Type", "Authorization"]
}))

// routes
app.use("/todo", todoRoute);
app.use("/user", userRoute);


app.get('/', (req, res) => {
    res.send("Hello neha");
})

app.listen(PORT, () => {
    console.log(`Port is listening on ${PORT}`);
})