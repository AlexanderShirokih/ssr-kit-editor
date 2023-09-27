import React, { useState } from 'react';
import '../../../styles/android.css';
import { ReactComponentWithInput } from '../../core/ComponentInput';
import { CheckboxComponent } from '../../core/Components';

const Checkbox : ReactComponentWithInput<CheckboxComponent> = ({ component, context }) => {
    const { default: defaultValue = false } = component;
    const [checked, setChecked] = useState(defaultValue);

    return (
        <div className="checkbox-wrapper" onClick={() => setChecked(!checked)}>
            {
                checked ?
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_4_1503)">
                            <rect x="3" y="3" width="18" height="18" rx="3" fill="#00AEC7" />
                            <path d="M9.75125 17.3153L5.09375 12.6578L6.50098 11.2505L9.75125 14.5003L13.8761 10.5001L18.001 6.5L19.2837 7.78277L9.75125 17.3153Z" fill="white" />
                        </g>
                        <defs>
                            <clipPath id="clip0_4_1503">
                                <rect width="18" height="18" fill="white" transform="translate(3 3)" />
                            </clipPath>
                        </defs>
                    </svg>
                    :
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <rect x="4" y="4" width="16" height="16" rx="2" stroke="#999999" stroke-width="2" />
                    </svg>

            }
        </div>
    );
}

export default Checkbox;
