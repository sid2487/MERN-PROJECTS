import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import todoRoute from "../Backend/routes/todo.route.js";
import userRoute from "../Backend/routes/user.route.js";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5002;
const app = express();

// routes
app.use(express.json());
app.use("/todo", todoRoute);
app.use("/user", userRoute);


app.get('/', (req, res) => {
    res.send("Hello neha");
})

app.listen(PORT, () => {
    console.log(`Port is listening on ${PORT}`);
})