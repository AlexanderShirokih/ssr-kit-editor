
const RootView = ({ component, context }) => {
    const { appBar, bottomBar, body } = component;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {appBar && context.render(appBar)}
            <main style={{ flex: 1, overflow: 'auto' }}>
                {body && body.map((item) => context.render(item))}
            </main>
            {bottomBar && context.render(bottomBar)}
        </div>
    );
}

export default RootView;
