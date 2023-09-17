import React from 'react';

const StubComponent = ({ type }) => {
    return <div style={{ color: 'red', border: '1px solid red', padding: '10px' }}>
        Error: Component of type "{type}" not found!
    </div>;
};

export default StubComponent;
