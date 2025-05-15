import express from "express";
import { createTodo, deleteTodo, getTodos, updateTodo } from "../controllers/todo.controller.js";
import { authenticate } from "../middlewares/authorize.js";

const router = express.Router();

router.post("/create", authenticate, createTodo);
router.get("/fetch", authenticate, getTodos);
router.put("/update/:id", authenticate, updateTodo);
router.delete("/delete/:id", authenticate, deleteTodo);

export default router;