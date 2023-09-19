import React from 'react';

type StubComponentProps = {type: string}

const StubComponent: React.FC<StubComponentProps> = ({ type }) => {
    return <div style={{ color: 'red', border: '1px solid red', padding: '10px' }}>
        Error: Component of type "{type}" not found!
    </div>;
};

export default StubComponent;
