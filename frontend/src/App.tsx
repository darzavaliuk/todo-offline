import React from 'react';
import './App.css';
import TodoList from "./components/Todo/TodoList";
import {Route, Routes} from "react-router-dom";
import Welcome from "./components/Welcome/Welcome";

function App() {
    return (
        <Routes>
            <Route path="/" element={<TodoList/>}/>
            <Route path="about" element={<Welcome/>}/>
            <Route path="*" element={<TodoList/>}/>
        </Routes>
    );
}

export default App;
