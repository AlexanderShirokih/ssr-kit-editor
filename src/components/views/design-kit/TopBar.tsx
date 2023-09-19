import React, { MouseEventHandler } from "react";
import { TopBarComponent } from "../../core/Components";
import { ReactComponentWithInput } from "../../core/ComponentInput";
import { DeviceType } from "../../core/DeviceType";
import '../../../styles/ios.css';
import '../../../styles/android.css';

interface OnSVGClick {
    onClick: MouseEventHandler<SVGSVGElement>;
}

const AndroidBackArrow: React.FC<OnSVGClick> = ({ onClick }) => {
    const style = {
        cursor: 'pointer'
    };

    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            style={style}
            onClick={onClick}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M20 10.9899V13.0101H7.87879L13.4343 18.5657L12 20L4 12L12 4L13.4343 5.43434L7.87879 10.9899H20Z" fill="#00AEC7" />
        </svg>
    );
}

const IosBackArrow: React.FC = () => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M6 11.9614C6 12.3545 6.146 12.6914 6.46045 12.9834L15.1978 21.541C15.4448 21.7881 15.7593 21.9229 16.1299 21.9229C16.8711 21.9229 17.4663 21.3389 17.4663 20.5864C17.4663 20.2158 17.3091 19.8901 17.062 19.6318L9.18945 11.9614L17.062 4.29102C17.3091 4.03271 17.4663 3.6958 17.4663 3.33643C17.4663 2.58398 16.8711 2 16.1299 2C15.7593 2 15.4448 2.13477 15.1978 2.38184L6.46045 10.9282C6.146 11.2314 6 11.5684 6 11.9614Z" fill="#00A897" />
        </svg>
    );
}

const TopBar: ReactComponentWithInput<TopBarComponent> = ({ component, context }) => {
    const { title } = component;

    const onBack = () => {
        context.evaluateAction("navigate(back)");
    };

    switch (context.getDevice()) {
        case DeviceType.ANDROID:
            return (
                <div className="topBar">
                    <div className="topBarHeader">
                        <AndroidBackArrow onClick={onBack} />
                    </div>
                    <div className="topBarBody">
                        <span className="topBarTitle">{title}</span>
                    </div>
                </div>
            );

        case DeviceType.IOS:
            return (
                <div className="iosTopBar">
                    <div
                        onClick={onBack}
                        style={{ cursor: 'pointer' }}
                        className="iosTopBarHeader">
                        <IosBackArrow />
                        <span className="iosNavigationText">Назад</span>
                    </div>
                    <div className="iosTopBarBody">
                        <span className="iosTextH1">{title}</span>
                    </div>
                </div>
            );
    }
};

export default TopBar;