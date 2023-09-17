import React from 'react';

const NoScreenError = ({ currentScreen, screens, goToStart }) => {
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        textAlign: 'center'
    };

    return (
        <div style={containerStyle}>
            <h1>Экран не найден.</h1>
            <p>Текущий экран: {currentScreen || 'undefined'}</p>
            <p>Доступные экраны: {screens.join(', ')}</p>
            <button onClick={goToStart}>Перейти в начало</button>
        </div>
    );
};

export default NoScreenError;
