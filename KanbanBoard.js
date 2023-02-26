import React, { useState } from 'react';
import './KanbanBoard.css';

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Task 1', status: 'todo' },
    { id: 2, title: 'Task 2', status: 'in-progress' },
    { id: 3, title: 'Task 3', status: 'done' },
  ]);

  const handleDragStart = (e, task) => {
    e.dataTransfer.setData('task', JSON.stringify(task));
  };

  const handleDrop = (e, status) => {
    const task = JSON.parse(e.dataTransfer.getData('task'));
    const newTasks = tasks.map((t) => {
      if (t.id === task.id) {
        return { ...t, status };
      } else {
        return t;
      }
    });
    setTasks(newTasks);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    const newTask = {
      id: tasks.length + 1,
      title: inputValue,
      status: 'todo',
    };
    setTasks([...tasks, newTask]);
    setInputValue('');
  };

  const handleDeleteTask = (id) => {
    const newTasks = tasks.filter((t) => t.id !== id);
    setTasks(newTasks);
  };

  const handleEditTask = (id, newTitle) => {
    const newTasks = tasks.map((t) => {
      if (t.id === id) {
        return { ...t, title: newTitle };
      } else {
        return t;
      }
    });
    setTasks(newTasks);
  };

  return (
    <div className="kanban-board">
      <div className="column" onDrop={(e) => handleDrop(e, 'todo')} onDragOver={handleDragOver}>
        <h3>Todo</h3>
        {tasks
          .filter((t) => t.status === 'todo')
          .map((t) => (
            <div key={t.id} className="task" draggable onDragStart={(e) => handleDragStart(e, t)}>
              <span>{t.title}</span>
              <div className="buttons">
                <button onClick={() => handleDeleteTask(t.id)}>Delete</button>
                <button onClick={() => handleEditTask(t.id, prompt('Enter new task title:'))}>Edit</button>
              </div>
            </div>
          ))}
        <form onSubmit={handleAddTask}>
          <input type="text" placeholder="Add new task" value={inputValue} onChange={handleInputChange} />
          <button type="submit">Add</button>
        </form>
      </div>
      <div className="column" onDrop={(e) => handleDrop(e, 'in-progress')} onDragOver={handleDragOver}>
        <h3>In Progress</h3>
        {tasks
          .filter((t) => t.status === 'in-progress')
          .map((t) => (
            <div key={t.id} className="task" draggable onDragStart={(e) => handleDragStart(e, t)}>
              <span>{t.title}</span>
              <div className="buttons">
              <button onClick={() => handleDeleteTask(t.id)}>Delete</button>
                <button onClick={() => handleEditTask(t.id, prompt('Enter new task title:'))}>Edit</button>
              </div>
            </div>
          ))}
      </div>
      <div className="column" onDrop={(e) => handleDrop(e, 'done')} onDragOver={handleDragOver}>
        <h3>Done</h3>
        {tasks
          .filter((t) => t.status === 'done')
          .map((t) => (
            <div key={t.id} className="task" draggable onDragStart={(e) => handleDragStart(e, t)}>
              <span>{t.title}</span>
              <div className="buttons">
                <button onClick={() => handleDeleteTask(t.id)}>Delete</button>
                <button onClick={() => handleEditTask(t.id, prompt('Enter new task title:'))}>Edit</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default KanbanBoard;


              
