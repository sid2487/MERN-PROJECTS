import express, { json } from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import courseRoute from "./routes/course.routes.js"

dotenv.config();
connectDB();

const app = express();

// middlewares
app.use(express.json());


// routes
app.use("/api/v1/course", courseRoute);



const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
    console.log("Server is running on ", PORT);
})
