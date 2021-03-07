import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser } from "@fortawesome/free-solid-svg-icons"
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons"

import React, { useState, useEffect } from 'react';

const MUTE = '#6c757d';
const WARNING = '#c29100';
const LIMIT = 'Crimson';

const API_URL = `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}`;

function TaskDetailsForm(params) {

    // const [taskNameLength, setTaskNameLength] = useState(0);
    const [mutedTaskName, setColorTaskName] = useState(MUTE);
    const [mutedTaskDesc, setColorTaskDesc] = useState(MUTE);
    const [columns, setColumns] = useState([]);

    const [taskName, setTaskName] = useState('');
    const [taskText, setTaskText] = useState('');
    const [taskPriority, setTaskPriority] = useState('')

    const columnId = params.columnId;
    const taskId = +params.taskId;

    function inputChange(e) {
        switch (e.target.id) {
            case "task_name":
                setTaskName(e.target.value);
                // setTaskNameLength(e.target.value.length)
                break;
            case "task_desc":
                setTaskText(e.target.value)
                break;
            case "task_prio":
                setTaskPriority(e.target.value)
                break;
            default:
                console.log(`lol`);
        }
    }

    useEffect(() => {
        setColorTaskName(taskName.length >= 30 && taskName.length < 36 ? WARNING : taskName.length >= 36 ? LIMIT : MUTE)
    }, [taskName]);

    useEffect(() => {
        setColorTaskDesc(taskText.length >= 850 && taskText.length < 1000 ? WARNING : taskText.length >= 1000 ? LIMIT : MUTE)
    }, [taskText]);

    useEffect(() => {
        fetch(`${API_URL}/columns`)
            .then(res => res.json())
            .then(data => {
                setColumns(data)
            })

        fetch(`${API_URL}/columns/tasks/${columnId}/${taskId}`)
            .then(res => res.json())
            .then(res => {
                let myTask = res.tasks.filter(task => {
                    return (task.id === taskId)
                })[0]
                setTaskName(myTask.name);
                setTaskText(myTask.tasktext)
                setTaskPriority(myTask.priority)
            })
    }, [])

    function ColumnNames() {
        let columnList = columns.map(column => {
            return (
                <option value={column._id}>{column.name}</option>
            )
        })
        return (
            columnList
        )
    }

    function updateTask(e) {
        e.preventDefault();
        let name = taskName;
        let tasktext = taskText;
        let priority = taskPriority;

        let data = { name, tasktext, priority, columnId, taskId }

        let fetchData = {
            method: 'PUT',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify(data)
        }

        fetch(`${API_URL}/columns/tasks/update`, fetchData)
            .then((res) => res.json())
            .then(res => {
                console.log(res);
                window.location = "/";
            });

    }

    function deleteTask() {
        let data = { columnId, taskId }

        let fetchData = {
            method: 'DELETE',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify(data)
        }

        fetch(`${API_URL}/columns/tasks/delete`, fetchData)
            .then((res) => res.json())
            .then(res => {
                console.log(res);
                window.location = "/";
            });
    }

    return (
        <Form onSubmit={updateTask}>
            <Form.Group>
                <Form.Label htmlFor="task_name">Nombre de la tarea</Form.Label>
                <Form.Control name="name" required type="text" placeholder="Revisar..." maxLength="36" id="task_name" onInput={inputChange} value={taskName} />
                <Form.Text style={{ color: mutedTaskName, fontSize: ".875em" }}>
                    Caracteres: {taskName.length}/36
                        </Form.Text>
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="task_desc">Descripción de la tarea</Form.Label>
                <Form.Control name="tasktext" required as="textarea" rows={10} id="task_desc" maxLength="1000" onInput={inputChange} value={taskText} />
                <Form.Text style={{ color: mutedTaskDesc, fontSize: ".875em" }}>
                    Caracteres: {taskText.length}/1000
                        </Form.Text>
            </Form.Group>
            <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label>Custom select</Form.Label>
                <Form.Control disabled name="column" required aria-required="true" as="select" custom value={columnId}>
                    <ColumnNames />
                </Form.Control>
            </Form.Group>
            <Form.Label>Prioridad de la tarea (de menor a mayor)</Form.Label>
            <Form.Group className="priority-group">
                <Form.Control id="task_prio" name="priority" required aria-required="true" as="select" custom value={taskPriority} onChange={inputChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </Form.Control>
            </Form.Group>
            <Button className="deleteTaskBtn" variant="danger" onClick={deleteTask}>Eliminar&nbsp;&nbsp;<FontAwesomeIcon icon={faEraser} /></Button>
            <Button className="updateTaskBtn" type="submit" style={{ float: "right" }}>Actualizar&nbsp;&nbsp;<FontAwesomeIcon icon={faPencilAlt} /></Button>
        </Form>
    )
}

export default TaskDetailsForm;