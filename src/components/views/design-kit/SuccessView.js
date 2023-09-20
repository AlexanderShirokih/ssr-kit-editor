import React from 'react';
import { DeviceType } from '../../core/DeviceType';
import Container from './Container';

const AndroidSuccessView = ({ component, context }) => {
    const { title, subtitle } = component;

    const rootViewComponent = {
        align: 'center',
        content: [
            {
                type: "Icon",
                name: "ic_success"
            },
            {
                type: "Spacer",
                spacing: 16
            },
            {
                type: "Text",
                style: "h3",
                content: title
            },
            {
                type: "Spacer",
                spacing: 4
            },
            {
                type: "Text",
                style: "body2",
                content: subtitle
            }
        ]
    }

    return (
        <Container component={rootViewComponent} context={context} />
    );
};

const IosSuccessView = ({ component, context }) => {
    const { title, subtitle } = component;

    const rootViewComponent = {
        align: 'center',
        content: [
            {
                type: "Icon",
                name: "ic_success"
            },
            {
                type: "Spacer",
                spacing: 16
            },
            {
                type: "Text",
                style: "h2",
                content: title
            },
            {
                type: "Spacer",
                spacing: 10
            },
            {
                type: "Text",
                style: "body4",
                color: "#7C878A",
                content: subtitle
            }
        ]
    }

    return (
        <Container component={rootViewComponent} context={context} />
    );
};

const SuccessView = ({ component, context }) => {
    const device = context.getDevice();

    switch (device) {
        case DeviceType.IOS:
            return <IosSuccessView component={component} context={context} />
        default:
            return <AndroidSuccessView component={component} context={context} />
    }
};

export default SuccessView;
