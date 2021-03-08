import TaskDetailsForm from './TaskDetailsForm';
import { useParams } from 'react-router-dom';

function TaskDetails() {
    const params = useParams();
    
    const taskId = +params.task_id;
    const columnId = params.column_id;

    return (
        <div id="edit_task_root">
            <div id="edit_task">
                <h1>Editar tarea</h1>
                {/* <p>{taskId}</p>
                <p>{columnId}</p> */}
                <TaskDetailsForm columnId={columnId} taskId={taskId} />
            </div>
        </div>
    )
}

export default TaskDetails;