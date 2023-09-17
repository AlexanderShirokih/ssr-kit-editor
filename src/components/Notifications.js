import React from 'react';

const Notifications = ({ messages }) => {
    const notificationStyle = {
        height: '240px',
        background: '#eee',
        overflowY: 'auto',
        padding: '10px',
        borderTop: '1px solid #ddd',
        borderRadius: '10px',
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };

    return (
        <div style={notificationStyle}>
            {[...messages].reverse().map(({ message, tag, dateTime }, index) => {
                return (
                    <div key={index} style={{ padding: '10px', background: '#f8f8f8', marginBottom: '10px' }}>
                        <span style={{ fontWeight: 'bold' }}> {formatTime(dateTime)} {tag}</span>: {message}
                    </div>
                );
            })}
        </div>
    );
};

export default Notifications;
