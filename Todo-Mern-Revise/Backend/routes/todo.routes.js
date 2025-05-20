import express from "express";
import { createTodo, deleteTodo, fetchTodos, updateTodo } from "../controllers/todo.controller.js";
import { authenticate } from "../middlewares/authorize.js";

const router = express.Router();

router.post('/createtodo', authenticate, createTodo);
router.get('/fetchtodos', authenticate, fetchTodos);
router.put('/updatetodo/:id', authenticate, updateTodo);
router.delete('/deletetodo/:id', authenticate, deleteTodo);

export default router;