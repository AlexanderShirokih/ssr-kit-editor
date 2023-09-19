import { JsonEditor } from 'jsoneditor-react';
import ace from 'brace';
import 'brace/mode/json';
import 'brace/theme/github';
import React from 'react';
import { ScreensSet } from '../core/Components';

interface EditorProps {
  data: ScreensSet;  // Replace 'any' with the actual type if known
  onDataChange: (screens: ScreensSet) => void;  // Replace 'any' with the actual type if known
}

const Editor: React.FC<EditorProps> = ({ data, onDataChange }) => {
  const handleDataChange = (parsedData: ScreensSet) => {  // Replace 'any' with the actual type if known
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
