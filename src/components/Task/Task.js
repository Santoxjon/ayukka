import { Form } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';

const API_URL = `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}`;

function Task(params) {

    let column = params.column;
    let task = params.task;

    function goToTask(e) {
        window.location = `/columns/${e.target.parentNode.parentNode.id.substr(5)}/tasks/${task.id}`
    }

    function dragStart(e) {
        e.dataTransfer.setData("Text", e.target.id +"-"+e.target.parentNode.id);
        let tasks_divs = Array.from(document.getElementsByClassName('tasks'))
        tasks_divs.forEach(div => {
            div.style.paddingBottom = "50px";
        });
    }

    return (
        <div onDragStart={dragStart} draggable id={`_${task.id}`} className="task" style={{ backgroundColor: `rgba(${column.color},.85)` }}>
            <h3 className="task-title" onClick={goToTask}>{task.name}</h3>
            <hr />
            <p className="task-text">
                {
                    task.tasktext.length > 100 ? `${task.tasktext.substr(0, 100).trim()}...` : task.tasktext
                }
            </p>
            <hr />
            <p className="priority">Prioridad: {task.priority}</p>
        </div>
    )
}

export default Task;