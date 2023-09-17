import React from 'react';

const ImageView = ({ component, context }) => {
    const {
        src,
        alt,
        fit = "aspectFit" } = component;

    const getFitStyle = (fit) => {
        switch (fit) {
            case "aspectFit":
                return "contain";
            case "aspectFill":
                return "cover";
            case "fill":
                return "fill";
            default:
                return "contain";  // default to "aspectFit"
        }
    };

    const imageStyle = {
        width: '100%',
        objectFit: getFitStyle(fit)
    };

    return (
        <img src={src} style={imageStyle} alt={alt} />
    );
};

export default ImageView;
