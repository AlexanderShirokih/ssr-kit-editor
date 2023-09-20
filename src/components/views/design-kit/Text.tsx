import { ReactComponentWithInput } from "../../core/ComponentInput";
import { TextComponent } from "../../core/Components";
import { DeviceType } from "../../core/DeviceType";
import React from 'react';
import '../../../styles/ios.css';
import '../../../styles/android.css';

type DeviceTextStyleMap = { android: string, ios: string }

const STYLES: Record<string, DeviceTextStyleMap> = {
    h1: {
        android: 'androidTextH1',
        ios: 'iosTextH1'
    },
    h2: {
        android: 'androidTextH2',
        ios: 'iosTextH2'
    },
    h3: {
        android: 'androidTextH3',
        ios: 'iosTextH3'
    },
    h4: {
        android: 'androidTextH4',
        ios: 'iosTextH4'
    },
    body1: {
        android: 'androidTextBody1',
        ios: 'iosBody1'
    },
    body2: {
        android: 'androidTextBody2',
        ios: 'iosBody3'
    },
    body3: {
        android: 'androidTextBody3',
        ios: 'iosBody3'
    },
    body4: {
        android: 'androidTextBody2',
        ios: 'iosBody4'
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
