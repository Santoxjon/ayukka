import React, { useState, useEffect } from 'react';
import Column from './Column';
import Task from './Task';

function Columns() {

    const API_URL = `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}`;
    const [columns, setColumns] = useState([])
    const [listColumns, setListColumns] = useState([]);

    function getColumns() {
        fetch(`${API_URL}/columns`)
            .then(res => res.json())
            .then(data => {
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
                        <Task task={task} column={column} />
                    )
                });
                return (
                    <Column column={column} taskList={taskList}/>
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