import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import todoRoute from "./routes/todo.routes.js";
import userRoute from "./routes/user.routes.js";
import cors from "cors"
import cookieParser from "cookie-parser";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

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

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.use("/todo", todoRoute);
app.use("/user", userRoute);



app.listen(PORT, () => {
    console.log(`Port is running on ${PORT}`);
})

