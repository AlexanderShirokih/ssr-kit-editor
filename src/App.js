import React, { useState } from 'react';
import './App.css';
import Editor from './components/Editor';
import Preview from './components/Preview';
import sampleData from './samples/sampleData';
import Notifications from './components/Notifications';

const devices = [
  { name: "Android (Light ☀️ )", width: 375, height: 812 }
];

function App() {
  const [layoutData, setLayoutData] = useState(sampleData);
  const [selectedDevice, setSelectedDevice] = useState(devices[0]);
  const [notifications, setNotifications] = useState([]);

  const notificationsController = {
    addNotification: (tag, message) => {
      setNotifications((prev) => [...prev, { message: message, tag: tag, dateTime: Date.now(), }]);
    }
  };

  return (
    <div className="app">
      <Editor data={layoutData} onDataChange={setLayoutData} />
      <div className="preview">
        <select value={selectedDevice.name} onChange={e => setSelectedDevice(devices.find(d => d.name === e.target.value))}>
          {devices.map(d => (<option key={d.name} value={d.name}> {d.name}</option>))}
        </select>
        <Preview data={layoutData} device={selectedDevice} notifications={notificationsController} />
        <Notifications messages={notifications} />
      </div>
    </div>
  );
}

export default App;
