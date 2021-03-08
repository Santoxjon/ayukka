import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons"

import { MUTE, WARNING, LIMIT } from './Colors';

const API_URL = `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}`;

function CreateColumnForm() {

    const [colColor, setColColor] = useState('0,0,0')
    const [mutedColName, setMutedColName] = useState(MUTE);
    const [mutedColDesc, setMutedColDesc] = useState(MUTE);
    const [colNameLength, setColNameLength] = useState(0);
    const [colDescLength, setColDescLength] = useState(0);

    function inputChange(e) {
        switch (e.target.id) {
            case "colName":
                setColNameLength(+e.target.value.length);
                break;
            case "colDesc":
                setColDescLength(+e.target.value.length);
                break;
            default:
                console.log("lol");
                break;
        }
    }

    useEffect(() => {
        setMutedColName(colNameLength >= 15 && colNameLength < 20 ? WARNING : colNameLength >= 20 ? LIMIT : MUTE);
    }, [colNameLength])
    useEffect(() => {
        setMutedColDesc(colDescLength >= 20 && colDescLength < 30 ? WARNING : colDescLength >= 30 ? LIMIT : MUTE);
    }, [colDescLength])

    return (
        <Form method="POST" action={`${API_URL}/columns/create`}>
            <Form.Group>
                <Form.Label>Nombre de la columna</Form.Label>
                <Form.Control required placeholder="Columna N" id="colName" name="columnName" type="text" maxLength="20" onChange={inputChange} />
                <Form.Text style={{ color: mutedColName, fontSize: ".875em" }}>
                    Caracteres: {colNameLength}/20
                </Form.Text>
            </Form.Group>
            <Form.Group>
                <Form.Label>Descripción breve de la columna</Form.Label>
                <Form.Control placeholder="Cosas y tal..." id="colDesc" name="columnDesc" type="text" maxLength="30" onChange={inputChange} />
                <Form.Text style={{ color: mutedColDesc, fontSize: ".875em" }}>
                    Caracteres: {colDescLength}/30
                </Form.Text>
            </Form.Group>
            <div className="column-color">
                <Form.Control name="color" required aria-required="true" as="select" custom onChange={(e) => setColColor(e.target.value)}>
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
            <Button className="createColumnBtn" type="submit">
                Crear&nbsp;&nbsp;<FontAwesomeIcon icon={faPencilAlt} />
            </Button>
        </Form>
    )
}

export default CreateColumnForm;