function Task(params) {
    let column = params.column;
    let task = params.task;

    function goToTask() {
       window.location = `/columns/tasks/${task.id}`
    }

    return (
        <div className="task" style={{ backgroundColor: `rgba(${column.color}, .85)` }} onClick={goToTask}>
            <h3>{task.name}</h3>
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