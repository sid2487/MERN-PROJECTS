import Todo from "../model/todo.model.js";

export const createTodo = async (req, res) => {
    // console.log("creating todo....")

    const { text, completed } = req.body;

    const todo = new Todo({ text, completed, user: req.user._id });

    try {
        const newTodo = await todo.save();
        res.status(201).json({ message: "Successfully created Todo", newTodo });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Failed to create Todo" });
    }


}

export const fetchTodos = async (req, res) => {
    // console.log("Fetching todos....")

    try {
        const todo = await Todo.find({ user: req.user._id })
        res.status(201).json({ message: "Todo fetched Successfully", todo });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Failed to fetch Todos" });
    }
}

export const updateTodo = async (req, res) => {
    // console.log("Updating todo....")

    try {
        const { id } = req.params;
        const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, {
            new: true,
        });

        res.status(201).json({ message: "Todo updated Successfully", updatedTodo });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Failed to updated Todo" });
    }
}

export const deleteTodo = async (req, res) => {
    // console.log("Deleting todo....")

    try {
        const { id } = req.params;
        const todo = await Todo.findByIdAndDelete(id);
        
        if(!todo){
            return res.status(404).json({ message: "Todo not found" });
        }

        res.status(201).json({ message: "Successfully deleted the Todo" });
        
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Failed to delete the Todo" });
    }
}