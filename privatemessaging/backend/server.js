// Basic setup and wrap http server for real time socket handling.
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


// mapping usernames to their socket ids.
const users = {}; // {username: socket.id}

// when someone opens react app, this fires,made the socket connection and each tab gets a unique socket.id.
io.on("connection", (socket) => {

    // step1: register user
    // called from frontend once user enters username
    socket.on("register", (username) => {
        users[username] = socket.id; // saves mapping { 'sid': 'socket123', 'arya': 'socket456' }
    });

    // step2: recieve private message
    // this comes when someone sends a message, contains sender receicer and message, and we look up receiverSocket using username.
    socket.on("privateMessage", ({ sender, receiver, message }) => {
        const receiverSocket = users[receiver];

        // io.to(receiverSocket).emit() → sends to that user only.
        const data = {
            sender,
            message,
            timestamp: new Date().toISOString(),
        };
        if (receiverSocket) {
            io.to(receiverSocket).emit("privateMessage", data);
        }

        // echo back to sender for local display (optional).
        socket.emit("privateMessage", data);
    });

    socket.on("disconnect", () => {
        //  Remove disconnected socket from users map.
        for (let name in users) {
            if (users[name] === socket.id) {
                delete users[name];
                break;
            }
        }
    });
});



server.listen(5000, () => {
    console.log("Server is running on http://localhost:5000");
});