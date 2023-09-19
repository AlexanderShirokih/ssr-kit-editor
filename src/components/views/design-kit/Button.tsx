import React from 'react';
import { ButtonComponent } from '../../core/Components';
import { ReactComponentWithInput } from '../../core/ComponentInput';
import '../../../styles/ios.css';
import '../../../styles/android.css';
import { DeviceType } from '../../core/DeviceType';

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const Button: ReactComponentWithInput<ButtonComponent> = ({ component, context }) => {
    const { content, style, tapActions = [] } = component;

    const onClick = () => {
        tapActions.forEach(action => {
            context.evaluateAction(action);
        });
    };

    const classPostfix = style && capitalize(style);

    switch (context.getDevice()) {
        case DeviceType.ANDROID:
            return (
                <div className='button' onClick={onClick}>
                    <div className={`buttonContainer buttonContainer${classPostfix}`}>
                        <span className={`buttonContent buttonContent${classPostfix}`}>{content}</span>
                    </div>
                </div>
            );

        case DeviceType.IOS:
            return (
                <div key={content} className={`iosButton iosButton${classPostfix}`} onClick={onClick}>
                    <span className="iosButtonText">{content}</span>
                </div>
            );
    }
};

export default Button;
