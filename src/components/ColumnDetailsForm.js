import React, { useState, useEffect } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons"
import { faEraser } from "@fortawesome/free-solid-svg-icons"

import { MUTE, WARNING, LIMIT } from './Colors';

const API_URL = `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}`;


function ColumnDetailsForm(params) {
    const columnId = params.columnId;

    const [mutedColName, setMutedColName] = useState(MUTE);
    const [mutedColDesc, setMutedColDesc] = useState(MUTE);
    const [colColor, setColColor] = useState('');
    const [colName, setColName] = useState('');
    const [colDesc, setColDesc] = useState('');

    useEffect(() => {
        fetch(`${API_URL}/columns/${columnId}`)
            .then(res => res.json())
            .then(data => {
                setColColor(data.color);
                setColName(data.name);
                setColDesc(data.description);
            })
    }, [])

    function inputChange(e) {
        switch (e.target.id) {
            case "colName":
                setColName(e.target.value);
                setMutedColName(e.target.value.length >= 15 && e.target.value.length < 20 ? WARNING : e.target.value.length >= 20 ? LIMIT : MUTE);
                break;
            case "colDesc":
                setColDesc(e.target.value);
                setMutedColDesc(e.target.value.length >= 20 && e.target.value.length < 30 ? WARNING : e.target.value.length >= 30 ? LIMIT : MUTE);
                break;
            default:
                console.log("lol");
                break;
        }
    }

    function updateColumn(e) {
        e.preventDefault();
        let name = colName;
        let description = colDesc;
        let color = colColor;

        let data = { columnId, name, description, color }

        let fetchData = {
            method: 'PUT',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify(data)
        }

        fetch(`${API_URL}/columns/${columnId}/update`, fetchData)
            .then((res) => res.json())
            .then(res => {
                window.location = "/";
            });
    }

    function deleteColumn() {
        if (window.confirm("!!! ATENCIÓN !!!\nLo que estás apunto de hacer no tiene vuelta atrás\nEsta acción borrara las columnas con todas las tareas que hay dentro, seguro que quieres continuar?")) {
            alert("Espero que sepas lo que haces, esta es la última oportunidad, si cierras este pop-up la columna se eliminará, si no quieres hacerlo cierra la pestaña");

            let data = { columnId }

            let fetchData = {
                method: 'DELETE',
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(data)
            }

            fetch(`${API_URL}/columns/${columnId}/delete`, fetchData)
                .then((res) => res.json())
                .then(res => {
                    console.log(res);
                    window.location = "/";
                });
        }
    }

    return (
        <Form onSubmit={updateColumn}>
            <Form.Group>
                <Form.Label>Nombre de la columna</Form.Label>
                <Form.Control required placeholder="Columna N" id="colName" name="columnName" type="text" maxLength="20" onChange={inputChange} value={colName} />
                <Form.Text style={{ color: mutedColName, fontSize: ".875em" }}>
                    Caracteres: {colName.length}/20
                </Form.Text>
            </Form.Group>
            <Form.Group>
                <Form.Label>Descripción breve de la columna</Form.Label>
                <Form.Control placeholder="Cosas y tal..." id="colDesc" name="columnDesc" type="text" maxLength="30" onChange={inputChange} value={colDesc} />
                <Form.Text style={{ color: mutedColDesc, fontSize: ".875em" }}>
                    Caracteres: {colDesc.length}/30
                </Form.Text>
            </Form.Group>
            <div className="column-color">
                <Form.Control name="color" required aria-required="true" as="select" custom onChange={(e) => setColColor(e.target.value)} value={colColor}>
                    <option hidden value="">Elige un color</option>
                    <option value="255,250,240">Floral White</option>
                    <option value="240,255,240">Honey Dew</option>
                    <option value="255,240,245">Lavender Blush</option>
                    <option value="250,240,230">Linen</option>
                    <option value="245,255,250">Mint Cream</option>
                    <option value="255,228,225">Misty Rose</option>
                    <option value="176,224,230">Powder Blue</option>
                </Form.Control>
                <div id="color_preview" style={{ backgroundColor: `rgb(${colColor})`, color: "black" }}>
                    <p>Preview</p>
                </div>
            </div>
            <Button className="deleteTaskBtn" variant="danger" onClick={deleteColumn}>Eliminar&nbsp;&nbsp;<FontAwesomeIcon icon={faEraser} /></Button>
            <Button className="createColumnBtn" type="submit">
                Actualizar&nbsp;&nbsp;<FontAwesomeIcon icon={faPencilAlt} />
            </Button>
        </Form>
    )
}

export default ColumnDetailsForm;