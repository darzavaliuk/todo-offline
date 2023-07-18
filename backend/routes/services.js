import Todo from "../models/task.js";

export async function createTodo(req, res) {
    const todo = new Todo({
        content: req.body.content,
        id: req.body.id,
    });

    try {
        const newTodo = await todo.save();
        res.status(201).json(todo);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

export async function deleteTodo(req, res) {
    const todoId = req.params.id;
    try {
        const deletedProject = await Todo.findOneAndDelete({id: todoId});
        if (!deletedProject) {
            return res.status(404).json({message: 'Not found'});
        }
        res.json(deletedProject);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

export async function listTodos(_req, res) {
    try {
        const todos = await Todo.find({});
        res.json(todos);
    } catch (err) {
        res.status(500).json({message: err.message});
    }

}

export async function updateTodo(req, res) {
    const projectId = req.params.id;
    try {
        const updatedProject = await Todo.findOneAndUpdate({id: projectId}, req.body, {new: true});
        if (!updatedProject) {
            return res.status(404).json({message: 'Проект не найден'});
        }
        res.json(updatedProject);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}