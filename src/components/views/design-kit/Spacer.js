import React from 'react';

const Spacer = ({ component, context }) => {
    const { spacing = 0, direction = 'vertical' } = component;

    const spacerStyle = direction === "horizontal" ?
        {
            width: `${spacing}px`,
            height: '100%'
        } :
        {
            height: `${spacing}px`,
            width: '100%'
        };

    return <div style={spacerStyle}></div>;
};

export default Spacer;
