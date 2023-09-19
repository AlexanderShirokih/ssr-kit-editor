import React from 'react';

interface Props {
  currentScreen: string | null;
  screens: string[];
  goToStart: () => void;
}

const NoScreenError: React.FC<Props> = ({ currentScreen, screens, goToStart }) => {
    const containerStyle: React.CSSProperties = {
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
