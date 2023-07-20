import React, {useEffect, useRef, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {addTodo, deleteTodo, setTodos, updateTodo} from "../../features/todo/todoSlice";
import {Link} from "react-router-dom";
import {toast} from 'react-toastify';
import {useOnline} from "../../hooks/UseOnline";
import './style.css';
import {TODOS, url} from "../../utils/constants";
import axios from 'axios'
import {processQueue} from "../../utils/service";
import {Todo as TodoItem} from "../../items/Todo";

const Todo = () => {
    const todos = useSelector((state: any) => state.todos.value);
    const dispatch = useDispatch();
    const isOnline = useOnline()
    const [syncState, setSyncState] = useState("idle")
    const inputRef = useRef<any>()
    const [inputValue, setInputValue] = useState("");
    const [editTaskId, setEditTaskId] = useState("");

    const handleInputChange = (event: any) => {
        setInputValue(event.target.value);
    };

    useEffect(() => {
        localStorage.setItem(TODOS, JSON.stringify(todos))
    }, [todos])

    useEffect(() => {
        sync()
        axios.get(url).then(res => res?.data ? dispatch(setTodos(res?.data)) : null)
    }, [])

    const sync = async () => {
        if (!isOnline) {
            return setSyncState('offline')
        }
        setSyncState('synchronizing')
        try {
            processQueue()
        } catch (e) {
            return setSyncState('failed')
        }
        setSyncState('synced')
    }


    useEffect(() => {
        if (!isOnline) {
            setSyncState('offline')
        } else {
            sync()
        }
    }, [isOnline])

    const handleAddTodo = () => {
        if (inputRef.current.value) {
            dispatch(addTodo(inputRef.current.value));
            sync()
            setInputValue("")
            toast.success('Task added successfully');
        }
    };

    const handleDeleteTodo = (id: string) => {
        dispatch(deleteTodo(id));
        sync()
        toast.success('Task deleted successfully');
    };


    const handleEditTask = (id: string) => {
        setEditTaskId(id)
        setInputValue(todos.filter((item: any) => item.id === id)[0].content)
    };

    const handleUpdateTask = async () => {
        if (inputRef.current.value) {

            dispatch(updateTodo({content: inputRef.current.value, id: editTaskId}));
            sync()
            // setTodos([...newTodos, newTodo])
            setEditTaskId("")
            setInputValue("")
            toast.success('Task updated successfully')
        }
    }


    return (
        <div className="container">
            <Link to="/about">
                <button>Go to About</button>
            </Link>
            <div className="todo-app">
                <p className="add-sunc">Status: {syncState}</p>
                <div className="row">
                    <i className="fas fa-list-check"></i>
                    <input
                        type="text"
                        className="add-task"
                        id="add"
                        placeholder="Add your todo"
                        autoFocus
                        value={inputValue}
                        onChange={handleInputChange}
                        ref={inputRef}
                    />
                    <button id="btn" onClick={editTaskId ? handleUpdateTask : handleAddTodo}>
                        {editTaskId ? 'Update' : 'Add'}
                    </button>
                </div>

                <ul id="list">
                    {todos?.map((task: TodoItem) => (
                        <li key={task.id}>
                            <p>{task.content}</p>
                            <div>
                                <img
                                    src="https://cdn-icons-png.flaticon.com/128/1159/1159633.png"
                                    className="edit"
                                    onClick={() => handleEditTask(task.id)}
                                    alt="edit"/>
                                <img
                                    src="https://cdn-icons-png.flaticon.com/128/3096/3096673.png"
                                    className="delete"
                                    onClick={() => handleDeleteTodo(task.id)}
                                    alt="detete"/>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    );
};

export default Todo;