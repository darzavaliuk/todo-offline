import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    content: {
        type: String,
        required: true,
    },
});

const Todo = mongoose.model('Todo', TodoSchema);
export default Todo;