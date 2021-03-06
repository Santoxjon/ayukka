function Column(params) {
    let column = params.column;
    let taskList = params.taskList;
    return (
        <div id={column._id} className="column" style={{ backgroundColor: `rgba(${column.color}, .55)` }} >
            <h1 className="col-title">
                {column.name}
            </h1>
            <h2 className="col-description">
                {column.description}
            </h2>
            <hr />
            <div className="tasks">
                {taskList}
            </div>
        </div>
    )
}

export default Column;