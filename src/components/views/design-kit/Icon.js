import React from 'react';
import { DeviceType } from '../../core/DeviceType';

const iconsContext = require.context('../../../assets/icons', false, /\.svg$/);

const Icon = ({ component, context }) => {
    const { name, alt } = component;

    const loadIcon = (name, device) => {
        const postfix = device === DeviceType.IOS ? '_ios' : '';

        try {
            let svgModule = iconsContext(`./${name}${postfix}.svg`);
            return svgModule.default || svgModule;
        } catch (e) {
            if (device !== DeviceType.ANDROID) {
                // Fallback to android
                return loadIcon(name, DeviceType.ANDROID);
            } else {
                console.log(e);
                return null;
            }
        }
    }

    let src = loadIcon(name, context.getDevice());

    return (
        <img src={src} alt={alt} />
    );
};

export default Icon;
