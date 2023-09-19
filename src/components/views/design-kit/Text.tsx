import { ReactComponentWithInput } from "../../core/ComponentInput";
import { TextComponent } from "../../core/Components";
import { DeviceType } from "../../core/DeviceType";
import React from 'react';
import '../../../styles/ios.css';
import '../../../styles/android.css';

type DeviceTextStyleMap = { android: string, ios: string }

const STYLES: Record<string, DeviceTextStyleMap> = {
    h1: {
        android: 'h1',
        ios: 'iosTextH1'
    },
    h2: {
        android: 'h2',
        ios: 'iosTextH2'
    },
    h3: {
        android: 'h3',
        ios: 'iosTextH3'
    },
    h4: {
        android: 'h4',
        ios: 'iosTextH4'
    },
    body1: {
        android: 'body1',
        ios: 'iosBody1'
    },
    body2: {
        android: 'body2',
        ios: 'iosBody3'
    },
    body3: {
        android: 'body3',
        ios: 'iosBody3'
    }
};

const Text: ReactComponentWithInput<TextComponent> = ({ component, context }) => {
    const { content, style = 'body2', color } = component;

    const baseStyle = STYLES[style] || STYLES['body2'];

    let className: string;
    switch (context.getDevice()) {
        case DeviceType.ANDROID:
            className = baseStyle.android;
            break;
        case DeviceType.IOS:
            className = baseStyle.ios;
            break;
    }

    return (
        <div className={className} style={{ color: color || undefined }}>{content}</div>
    );
};

export default Text;
