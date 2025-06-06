import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";



const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // allow all origin for dev
        methods: ["GET", "POST"],
    }
});

io.on("connection", (socket) => {
    socket.on("chatMessage", (data) => {
        io.emit("chatMessage", data); // this sends to EVERYONE
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

server.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});