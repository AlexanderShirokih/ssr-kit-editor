import React from 'react';

const iconsContext = require.context('../../../assets/icons', false, /\.svg$/);

const Icon = ({ component, context }) => {
    const { name, alt } = component;
    let svgModule = iconsContext(`./${name}.svg`);
    const src = svgModule.default || svgModule;

    return (
        <img src={src} alt={alt} />
    );
};

export default Icon;
