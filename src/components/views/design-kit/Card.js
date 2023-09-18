import React from 'react';

const CARD_STYLE = {
    boxShadow: '0px 3px 12px 0px #1F1F1F1A',
    padding: '16px 20px 16px 20px',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '11px',
};

const Card = ({ component, context }) => {
    const { content } = component;

    return (
        <div style={CARD_STYLE}>
            {content && context.render(content)}
        </div>
    );
};

export default Card;
