import { Form } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';

const API_URL = `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}`;

function Task(params) {

    const [columns, setColumns] = useState([])

    useEffect(() => {
        fetch(`${API_URL}/columns`)
            .then(res => res.json())
            .then(data => {
                setColumns(data);
            })
    }, [])

    let column = params.column;
    let task = params.task;

    function goToTask(e) {
        window.location = `/columns/${e.target.parentNode.parentNode.id.substr(5)}/tasks/${task.id}`
    }

    function Columns() {
        // let listColumns = columns.filter(col => col.name !== column.name).map(col => {
        //     return (
        //         <option value={col._id} data-colName={col.name}>{col.name}</option>
        //     )
        // })
        
        let listColumns = columns.map(col => {
            return (
                <option value={col._id} data-colName={col.name}>{col.name}</option>
            )
        })

        return (
            listColumns
        )
    }

    function moveTask(e) {
        console.log(e.target.selectedOptions[0].getAttribute('data-colName'));
        let data = { taskId: task.id, columnId: column._id, newColumnId: e.target.value }

        let fetchData = {
            method: 'PUT',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify(data)
        }

        fetch(`${API_URL}/columns/tasks/move`, fetchData)
            .then((res) => res.json())
            .then(res => {
                console.log(res);
                // window.location = "/";
                document.querySelector(`#tasks${e.target.value}`).appendChild(document.querySelector(`#_${task.id}`))
                column._id = e.target.value;
            });
    }

    return (
        <div id={`_${task.id}`} className="task" style={{ backgroundColor: `rgba(${column.color}, .85)` }}>
            <h3 className="task-title" onClick={goToTask}>{task.name}</h3>
            <hr />
            <p className="task-text">
                {
                    task.tasktext.length > 100 ? `${task.tasktext.substr(0, 100).trim()}...` : task.tasktext
                }
            </p>
            <hr />
            <p className="priority">Prioridad: {task.priority}</p>
            <hr />
            <Form.Control key="whatever" as="select" custom style={{ padding: "0 5px" }} onChange={moveTask}>
                <option hidden>Mover tarea a...</option>
                <Columns key="111" />
            </Form.Control>
        </div>
    )
}

export default Task;