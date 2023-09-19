import React from "react";

const Container = ({ component, context }) => {
    return (
        <ContainerWithStyle component={component} context={context} />
    );
};

export const ContainerWithStyle = ({ component, context, style = {} }) => {
    const {
        content,
        spacing = 0,
        direction = "vertical",
        align = "start",
    } = component;

    const containerStyle = {
        display: 'flex',
        flexDirection: direction === "horizontal" ? 'row' : 'column',
        gap: `${spacing}px`,
        ...style,
    };

    if (direction === "horizontal") {
        if (align === "center") containerStyle.justifyContent = "center";
        else if (align === "end") containerStyle.justifyContent = "flex-end";
    } else { // vertical
        if (align === "center") containerStyle.alignItems = "center";
        else if (align === "end") containerStyle.alignItems = "flex-end";
        else if (align === "fill") containerStyle.alignItems = "stretch";
    }

    return (
        <div style={containerStyle}>
            {content && content.map((item, index) => (
                <div key={index} style={{ flex: align === "fill" ? 1 : "auto" }}>
                    {context.render(item)}
                </div>
            ))}
        </div>
    );
};

export default Container;
