import CreateTaskForm from './CreateTaskForm';

function CreateTask() {
    return (
        <div id="create_task_root">
            <div id="create_task">
                <h1>Crear tarea</h1>
                <CreateTaskForm />
            </div>
        </div>
    )
}

export default CreateTask;