import React from 'react';
import { ContainerWithStyle } from './Container';
import { DeviceType } from '../../core/DeviceType';

const BottomControl = ({ component, context }) => {
    let style;
    let spacing;
    switch (context.getDevice()) {
        case DeviceType.IOS:
            style = {
                paddingBottom: '20px',
                paddingLeft: '16px',
                paddingRight: '16px'
            };
            spacing = 16;
            break;
        case DeviceType.ANDROID:
        default:
            style = {
                paddingBottom: '16px',
                paddingLeft: '16px',
                paddingRight: '16px'
            };
            spacing = 4;
            break;
    }

    const containerComponent = {
        align: "fill",
        spacing: spacing,
        content: component.content,
    };

    return <ContainerWithStyle
        component={containerComponent}
        context={context}
        style={style}
    />;
};

export default BottomControl;
