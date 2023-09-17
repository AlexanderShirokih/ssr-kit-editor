import React from 'react';

const iconsContext = require.context('../../../assets/icons', false, /\.svg$/);

const Icon = ({ component, context }) => {
    const { name, alt } = component;

    let src;

    try {
        let svgModule = iconsContext(`./${name}.svg`);
        src = svgModule.default || svgModule;
    } catch (e) {
        console.log(e);
    }

    return (
        <img src={src} alt={alt} />
    );
};

export default Icon;
