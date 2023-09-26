import React, { useState } from 'react';
import './App.css';
import Editor from './components/editor/Editor';
import Preview from './components/preview/Preview';
import sampleData from './samples/sampleData';
import Notifications, { NotificationItem } from './components/preview/Notifications';
import Device from './components/preview/Device';
import { DeviceType } from './components/core/DeviceType';
import { ScreensSet } from './components/core/Components';

const devices: Device[] = [
  { name: "Android (Light ☀️ )", width: 375, height: 812, appearance: DeviceType.ANDROID },
  { name: "iPhone (Light ☀️ )", width: 393, height: 852, appearance: DeviceType.IOS }
];

const scales: number[] = [0.75, 0.9, 1.0, 1.25];

const App: React.FC = () => {
  const [layoutData, setLayoutData] = useState<ScreensSet>(sampleData);
  const [selectedDevice, setSelectedDevice] = useState<Device>(devices[0]);
  const [scale, setScale] = useState<number>(1.0);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const notificationsController: NotificationsController = {
    addNotification: (tag: string, message: string) => {
      setNotifications((prev) => [...prev, { message, tag, dateTime: Date.now() }]);
    },
  };

  return (
    <div className="app">
      <Editor data={layoutData} onDataChange={setLayoutData} />
      <div className="preview">
        <select value={selectedDevice.name} onChange={e => setSelectedDevice(devices.find(d => d.name === e.target.value)!)}>
          {devices.map(d => (<option key={d.name} value={d.name}>{d.name}</option>))}
        </select>
        <select value={scale.toString()} onChange={s => setScale(parseFloat(s.target.value))}>
          {
            scales.map(s => {
              return (<option key={s} value={s}>{(s * 100).toString()} %</option>);
            })
          }
        </select>

        <Preview data={layoutData} device={selectedDevice} scale={scale} notifications={notificationsController} />
        <Notifications messages={notifications} />
      </div>
    </div>
  );
};

export default App;
