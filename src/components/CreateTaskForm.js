import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons"
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons"

import React, { useState, useEffect } from 'react';

import {MUTE, WARNING, LIMIT} from './Colors';

const API_URL = `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}`;

function CreateTaskForm(params) {
    const [taskNameLength, setTaskNameLength] = useState(0);
    const [mutedTaskName, setColorTaskName] = useState(MUTE);
    const [taskDescLength, setTaskDescLength] = useState(0);
    const [mutedTaskDesc, setColorTaskDesc] = useState(MUTE);
    const [columns, setColumns] = useState([])

    function inputChange(e) {
        switch (e.target.id) {
            case "task_name":
                setTaskNameLength(e.target.value.length)
                break;
            case "task_desc":
                setTaskDescLength(e.target.value.length)
                break;
            default:
                console.log(`lol`);
        }
    }

    useEffect(() => {
        setColorTaskName(taskNameLength >= 30 && taskNameLength < 36 ? WARNING : taskNameLength >= 36 ? LIMIT : MUTE)
    }, [taskNameLength]);

    useEffect(() => {
        setColorTaskDesc(taskDescLength >= 850 && taskDescLength < 1000 ? WARNING : taskDescLength >= 1000 ? LIMIT : MUTE)
    }, [taskDescLength]);

    useEffect(() => {
        fetch(`${API_URL}/columns`)
            .then(res => res.json())
            .then(data => {
                setColumns(data)
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

    return (
        <Form method="POST" action={`${API_URL}/columns/tasks/create`}>
            <Form.Group>
                <Form.Label htmlFor="task_name">Nombre de la tarea</Form.Label>
                <Form.Control name="name" required type="text" placeholder="Revisar..." maxLength="36" id="task_name" onInput={inputChange} />
                <Form.Text style={{ color: mutedTaskName, fontSize: ".875em" }}>
                    Caracteres: {taskNameLength}/36
                        </Form.Text>
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="task_desc">Descripción de la tarea</Form.Label>
                <Form.Control name="tasktext" required as="textarea" rows={10} id="task_desc" maxLength="1000" onInput={inputChange} />
                <Form.Text style={{ color: mutedTaskDesc, fontSize: ".875em" }}>
                    Caracteres: {taskDescLength}/1000
                        </Form.Text>
            </Form.Group>
            <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label>Custom select</Form.Label>
                <Form.Control name="column" required aria-required="true" as="select" custom>
                    <ColumnNames />
                </Form.Control>
            </Form.Group>
            <Form.Label>Prioridad de la tarea (de menor a mayor)</Form.Label>
            <Form.Group className="priority-group">
                <Form.Check inline name="priority" label="1" type="radio" value="1" required />
                <Form.Check inline name="priority" label="2" type="radio" value="2" required />
                <Form.Check inline name="priority" label="3" type="radio" value="3" required />
                <Form.Check inline name="priority" label="4" type="radio" value="4" required />
                <Form.Check inline name="priority" label="5" type="radio" value="5" required />
                <Form.Check inline name="priority" label="6" type="radio" value="6" required />
                <Form.Check inline name="priority" label="7" type="radio" value="7" required />
                <Form.Check inline name="priority" label="8" type="radio" value="8" required />
                <Form.Check inline name="priority" label="9" type="radio" value="9" required />
                <Form.Check inline name="priority" label="10" type="radio" value="10" required />
            </Form.Group>
            <Button variant="dark" type="reset">Vaciar&nbsp;&nbsp;<FontAwesomeIcon icon={faTrashAlt} /></Button>
            <Button className="createTaskBtn" type="submit">Crear&nbsp;&nbsp;<FontAwesomeIcon icon={faPencilAlt} /></Button>
        </Form>
    )
}

export default CreateTaskForm;