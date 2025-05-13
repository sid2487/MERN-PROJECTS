import Todo from "../model/todo.model.js";

export const createTodo = async (req, res) => {
    // console.log("Todo is Creating.....")
    // const todo = new Todo({
    //     text: req.body.text,
    //     completed: req.body.completed
    // });

    const { text, completed } = req.body;
    
    const todo = new Todo({
        text,
        completed
    });

    try {
        const newTodo = await todo.save();
        res.status(201).json({ message: "Todo created successfully", newTodo});
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error occuring in todo creation" });
    }
};

export const getTodos = async (req, res) => {
    // console.log("Get todo is Working....");

    try {
        const todos = await Todo.find();
        res.status(201).json({ message: "Todo Fetched successfully", todos});
    } catch (error) {
        console.error(error);
        res.status(404).josn({ message: "Error occuring in todo fetching" });
    }
};

export const updateTodo = async (req, res) => {
    try {
        // const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
        //     new: true,
        // });

        const { id } = req.params;

        const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, {
            new: true,
        })
        res.status(201).json({ message: "Todo Updated successfully", updatedTodo });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error in updating the Todo" });
    }
};

export const deleteTodo = async (req, res) => {
    // console.log("Todo is Deleting....");
    try {
        await Todo.findByIdAndDelete(req.params.id)
        res.status(201).json({ message: "Todo Deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error in deleting Todo" });
    }
}