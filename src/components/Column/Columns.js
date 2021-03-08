import React, { useState, useEffect } from 'react';
import Column from './Column';
import Task from '../Task/Task';

function Columns() {

    const [columns, setColumns] = useState([])
    const [listColumns, setListColumns] = useState([]);

    useEffect(() => {
        const API_URL = `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}`;

        function getColumns() {
            fetch(`${API_URL}/columns`)
                .then(res => res.json())
                .then(data => {
                    setColumns(data)
                })
        }

        getColumns();
    }, [])

    useEffect(() => {
        setListColumns(
            columns.map((column, index) => {
                let taskList = column.tasks.map((task, index) => {
                    return (
                        <Task key={`task${index}`} task={task} column={column} />
                    )
                });
                return (
                    <Column key={`col${index}`} column={column} taskList={taskList} />
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