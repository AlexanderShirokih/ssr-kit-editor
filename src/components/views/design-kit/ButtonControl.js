import React from 'react';
import { ContainerWithStyle } from './Container';

const BottomControl = ({ component, context }) => {
    const style = {
        paddingBottom: '16px',
        paddingLeft: '16px',
        paddingRight: '16px'
    };

    const containerComponent = {
        align: "fill",
        spacing: 4,
        content: component.content,
    };

    return <ContainerWithStyle
        component={containerComponent}
        context={context}
        style={style}
    />;
};

export default BottomControl;
