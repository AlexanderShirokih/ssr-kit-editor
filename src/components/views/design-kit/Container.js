import React from "react";

const Container = ({ component, context, style }) => {
    const {
        content,
        spacing = 0,
        direction = "vertical",
        align = "start",
    } = component;

    const containerStyle = {
        display: 'flex',
        flexDirection: direction === "horizontal" ? 'row' : 'column',
        width: '100%',
        gap: `${spacing}px`,
        ...style,
    };

    // Determine alignment
    if (direction === "horizontal") {
        if (align === "center") containerStyle.justifyContent = "center";
        else if (align === "end") containerStyle.justifyContent = "flex-end";
        // No need for "start" because it's the default behavior
    } else { // vertical
        if (align === "center") containerStyle.alignItems = "center";
        else if (align === "end") containerStyle.alignItems = "flex-end";
        else if (align === "fill") containerStyle.alignItems = "stretch"; // to make children fill width
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
