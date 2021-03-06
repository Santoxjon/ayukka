import React, { useState, useEffect } from 'react';

function Columns() {
    const API_URL = `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}`;
    const [columns, setColumns] = useState([])
    const [listColumns, setListColumns] = useState([]);

    function getColumns() {
        fetch(`${API_URL}/columns`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setColumns(data)
            })
    }

    useEffect(() => {
        getColumns();
    }, [])

    useEffect(() => {
        setListColumns(
            columns.map(column => {
                let taskList = column.tasks.map(task => {
                    return (
                        <div className="task">{task.name}</div>
                    )
                });
                return (
                    <div className="column" style={{ backgrounColor: "red"}}>
                        <h2>{column.name}</h2>
                        <p>{column.description}</p>
                        <div className="tasks">
                            {taskList}
                        </div>
                    </div>
                );
            })
        )
    }, [columns])
    return (
        <div id="columns">
            {listColumns}
        </div>
    )
}

export default Columns;