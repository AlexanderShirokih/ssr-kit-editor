import React from 'react';

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const Button = ({ component, context }) => {
    const { content, style, tapActions = [] } = component;

    const onClick = () => {
        tapActions.forEach(action => {
            context.evaluateAction(action);
        });
    };

    const classPostfix = capitalize(style);

    return (
        <div className='button' onClick={onClick}>
            <div className={`buttonContainer buttonContainer${classPostfix}`}>
                <span className={`buttonContent buttonContent${classPostfix}`}>{content}</span>
            </div>
        </div>
    );
};

export default Button;
