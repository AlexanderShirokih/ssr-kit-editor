
const STYLES = {
    h1: {
        fontSize: '34px',
        fontWeight: '700',
        fontFamily: 'Roboto, sans-serif',
        lineHeight: '40px',
    },
    h2: {
        fontSize: '24px',
        fontWeight: '700',
        fontFamily: 'Roboto, sans-serif',
        lineHeight: '32px',
    },
    h3: {
        fontSize: '20px',
        fontWeight: '700',
        fontFamily: 'Roboto, sans-serif',
        lineHeight: '28px',
    },
    h4: {
        fontSize: '18px',
        fontWeight: '700',
        fontFamily: 'Roboto, sans-serif',
        lineHeight: '24px',
    },
    body1: {
        fontSize: '16px',
        fontWeight: '500',
        fontFamily: 'Roboto, sans-serif',
        lineHeight: '20px',
    },
    body2: {
        fontSize: '14px',
        fontWeight: '500',
        fontFamily: 'Roboto, sans-serif',
        lineHeight: '18px',
    }
};

const Text = ({ component }) => {
    const { content, style = 'body2' } = component;

    const textStyle = STYLES[style] || STYLES['body2'];

    return (
        <div style={textStyle}>{content}</div>
    );
};

export default Text;
