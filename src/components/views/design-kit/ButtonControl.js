import React from 'react';
import Container from './Container';

const BottomControl = ({ component, context }) => {
    const style = {
        paddingBottom: '16px'
    };

    const containerComponent = {
        align: "fill",
        spacing: 4,
        content: component.content,
    };

    return <Container
        component={containerComponent}
        context={context}
        style={style}
    />;
};

export default BottomControl;
