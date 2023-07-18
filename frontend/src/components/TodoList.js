import React, {useState, useEffect, useRef} from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';
import {useOnline} from "../hooks/UseOnline";
import {v4 as uuidv4} from 'uuid';
import {TODOS, DELETE, CREATE, UPDATE, url} from "../utils/constants";
import {addToQueue, processQueue} from "../utils/service";
import axios from "axios";
const TodoList = () => {
    const isOnline = useOnline()
    const [syncState, setSyncState] = useState("idle")
    const inputRef = useRef()
    const [inputValue, setInputValue] = useState("");
    const [editTaskId, setEditTaskId] = useState("");
    const [todos, setTodos] = useState(() => {
        if (localStorage.getItem(TODOS)) {
            return JSON.parse(localStorage.getItem(TODOS))
        }
        return []
    })

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };


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
        localStorage.setItem(TODOS, JSON.stringify(todos))
    }, [todos])


    useEffect(() => {
        if (!isOnline) {
            setSyncState('offline')
        } else {
            sync()
        }
    }, [isOnline])


    useEffect(() => {
        sync()
        axios.get(url).then(res => res?.data ? setTodos(res?.data) : null)
    }, [])

    const handleDeleteTask = (id) => {
        const newTodos = todos.filter((item) => item.id !== id)
        addToQueue({type: DELETE, payload: {id}})
        sync()
        setTodos([...newTodos])
        toast.success('Task deleted successfully');
    }

    const handleAddTask = async () => {
        if (inputRef.current.value) {
            const newTodo = {content: inputRef.current.value, id: uuidv4()}
            addToQueue({type: CREATE, payload: newTodo})
            sync()
            setTodos([...todos, newTodo])
            setInputValue("")
            toast.success('Task added successfully');
        }
    };

    const handleEditTask = (id) => {
        setEditTaskId(id)
        setInputValue(todos.filter((item) => item.id === id)[0].content)
    };

    const handleUpdateTask = async () => {
        if (inputRef.current.value) {
            const newTodo = {content: inputRef.current.value, id: editTaskId}
            addToQueue({type: UPDATE, payload: newTodo})
            const newTodos = todos.filter((item) => item.id !== editTaskId)
            sync()
            setTodos([...newTodos, newTodo])
            setEditTaskId("")
            setInputValue("")
            toast.success('Task updated successfully')
        }
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            handleAddTask();
        }
    }

    return (
        <div className="container">
            <ToastContainer/>
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
                        onKeyPress={handleKeyPress}
                    />
                    <button id="btn" onClick={editTaskId ? handleUpdateTask : handleAddTask}>
                        {editTaskId ? 'Update' : 'Add'}
                    </button>
                </div>

                <ul id="list">
                    {todos?.map((task) => (
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
                                    onClick={() => handleDeleteTask(task.id)}
                                    alt="detete"/>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TodoList;