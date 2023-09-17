import React from 'react';

const Center = ({ component, context }) => {
    const { content } = component;

    const centerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    };

    return (
        <div style={centerStyle}>
            {context.render(content)}
        </div>
    );
};

export default Center;