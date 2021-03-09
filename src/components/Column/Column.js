import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons"

function Column(params) {
    let column = params.column;
    let taskList = params.taskList;

    function allowDrop(e) {
        e.preventDefault();
    }

    function drop(e) {
        e.preventDefault();

        if (e.target.classList.contains('tasks')) {
            var data = e.dataTransfer.getData("Text");
            e.target.appendChild(document.getElementById(data.split('-')[0]));

            let taskId = data.split('-')[0].substr(1);
            let columnId = data.split('-')[1].substr(5);
            let newColumnId = e.target.id.substr(5);

            moveTask(taskId, columnId, newColumnId, e);
        }
    }

    function moveTask(taskId, columnId, newColumnId, e) {
        console.log(e.target.parentNode);
        const API_URL = `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}`;
        let data = { taskId, columnId, newColumnId }

        let fetchData = {
            method: 'PUT',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify(data)
        }

        fetch(`${API_URL}/columns/tasks/move`, fetchData)
            .then((res) => res.json())
            .then(res => {
                // window.location = "/";
                let colColor = e.target.parentNode.style.backgroundColor.split(',');
                let rgba = `${colColor[0]},${colColor[1]},${colColor[2]}, .85)`
                var nodes = Array.from(e.target.childNodes);
                nodes.forEach(task => {
                    task.style.backgroundColor = rgba;
                });
            });
    }

    return (
        <div id={`_${column._id}`} className="column" style={{ backgroundColor: `rgba(${column.color}, .55)` }} >
            <div className="col-header">
                <h1 className="col-title">
                    {column.name}
                </h1>
                <div className="col-cog">
                    {/* <FontAwesomeIcon icon={faCog} /> */}
                    <a href={`/columns/${column._id}`}><FontAwesomeIcon icon={faCog} /></a>
                </div>
            </div>
            <h2 className="col-description">
                {column.description}
            </h2>
            <hr />
            <div id={`tasks${column._id}`} className="tasks" onDrop={drop} onDragOver={allowDrop}>
                {taskList}
            </div>
        </div>
    )
}

export default Column;