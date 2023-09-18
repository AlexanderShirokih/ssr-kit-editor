
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
    },
    body3: {
        fontFamily: 'Roboto, sans-serif',
        fontSize: '14px',
        fontWeight: '400',
        lineHeight: '18px',
        letterSpacing: '0em',
    }
};

const Text = ({ component }) => {
    const { content, style = 'body2', color } = component;

    const baseStyle = STYLES[style] || STYLES['body2'];
    const textStyle = color ? { ...baseStyle, color: color } : baseStyle;

    // TODO: apply 'color', which is hex now, to the style block

    return (
        <div style={textStyle}>{content}</div>
    );
};

export default Text;
