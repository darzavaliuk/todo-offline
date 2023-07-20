import {createSlice} from '@reduxjs/toolkit'
import {v4 as uuidv4} from 'uuid';
import {addToQueue} from "../../utils/service";
import {CREATE, DELETE, UPDATE} from "../../utils/constants";
import {TodoState} from "../../items/TodoState";
import {Todo} from "../../items/Todo";

const initialState: TodoState = {
    value: []
}

export const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo: (state: TodoState, action) => {
            const newTodo: Todo = {
                id: uuidv4(),
                content: action.payload,
            };
            addToQueue({type: CREATE, payload: newTodo})
            state.value = [...state.value, newTodo]
        },
        deleteTodo: (state, action) => {
            const index = state.value.findIndex((todo) => todo.id === action.payload);
            const id = action.payload
            addToQueue({type: DELETE, payload: {id}})
            if (index !== -1) {
                state.value.splice(index, 1);
            }
        },
        updateTodo: (state, action) => {
            const newTodo: Todo = {
                id: action.payload.id,
                content: action.payload.content,
            };
            addToQueue({type: UPDATE, payload: newTodo})
            const newTodos = state.value.filter((item) => item.id !== action.payload.id)
            state.value = ([...newTodos, newTodo])
        },
        setTodos: (state, action) => {
            state.value = [...action.payload]
        }
    },
})

// Action creators are generated for each case reducer function
export const {addTodo, deleteTodo, setTodos, updateTodo} = todoSlice.actions

export default todoSlice.reducer