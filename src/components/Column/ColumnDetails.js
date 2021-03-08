import { useParams } from 'react-router-dom';
import ColumnDetailsForm from './ColumnDetailsForm';

function ColumnDetails() {
    let params = useParams();
    let columnId = params.column_id;

    return (
        <div id="edit_col_root">
            <div id="edit_col">
                <h1>Editar columna</h1>
                <ColumnDetailsForm columnId={columnId} />
            </div>
        </div>
    )
}

export default ColumnDetails;