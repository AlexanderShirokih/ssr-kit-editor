import { JsonEditor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';
import ace from 'brace';
import 'brace/mode/json';
import 'brace/theme/github';

function Editor({ data, onDataChange }) {
    const handleDataChange = (parsedData) => {
        onDataChange(parsedData);
    };

    return (
        <div className='editor'>
            <JsonEditor
                value={data}
                ace={ace}
                mode={'code'}
                theme="ace/theme/github"
                allowedModes={['text', 'tree', 'code']}
                htmlElementProps={{ style: { height: '100%' } }}
                onChange={handleDataChange}
            />
        </div>
    );
}

export default Editor;
