import React from "react";

const BackArrow = ({ onClick }) => {
    const style = {
        cursor: 'pointer'
    };

    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            style={style}
            onClick={onClick}
        >
            <path d="M20 10.9899V13.0101H7.87879L13.4343 18.5657L12 20L4 12L12 4L13.4343 5.43434L7.87879 10.9899H20Z" fill="#00AEC7" />
        </svg>
    );
}

const TopBar = ({ component, context }) => {
    const { title } = component;

    const onBack = () => {
        context.evaluateAction("navigate(back)");
    };

    return (
        <div className="topBar">
            <div className="topBarHeader">
                <BackArrow onClick={onBack} />
            </div>
            <div className="topBarBody">
                <span className="topBarTitle">{title}</span>
            </div>
        </div>
    );
};

export default TopBar;