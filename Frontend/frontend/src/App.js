import React, { useState, useEffect } from 'react';
import './App.css';
import TodoView from './components/TodolistView';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [todolist, setTodolist] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    axios.get('/api/todo')
      .then(res => setTodolist(res.data))
      .catch(error => console.error("Error fetching todos:", error));
  }, []);

  const addTodoHandler = () => {
    axios.post('/api/todo/', { 'title': title, 'description': desc })
      .then(res => {
        setTodolist([...todolist, res.data]);
        setTitle("");
        setDesc("");
      })
      .catch(error => console.error("Error adding todo:", error));
  };

  return (
    <div className="App list-group-item justify-content-center align-items-center mx-auto" style={{ "width": "400px", "backgroundColor": "white", "marginTop": "80px" }}>
      <h1 className="card text-white bg-primary mb-1" style={{ "maxWidth": "20rem" }}>Task Manager</h1>
      <h6 className="card text-white bg-primary mb-3">FASTAPI - React - MongoDB</h6>
      <div className="card-body">
        <TodoView todolist={todolist} />
        <div className="input-group mb-3 mt-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-sm">Title</span>
          </div>
          <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={title} onChange={e => setTitle(e.target.value)} />
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Description</span>
          </div>
          <textarea className="form-control" aria-label="With textarea" value={desc} onChange={e => setDesc(e.target.value)}></textarea>
        </div>
        <button className="btn btn-outline-primary" onClick={addTodoHandler}>Add Task</button>
      </div>
    </div>
  );
}

export default App;
