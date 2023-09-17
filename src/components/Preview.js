import React, { useCallback, useMemo, useState } from 'react';
import ComponentFactory from './core/ComponentFactory';
import ComponentContext from './core/ComponentContext';
import ErrorBoundary from './ErrorBoundary';
import NoScreenError from './NoScreenError';
import createActionResolver from './core/ActionResolverFactory';

ComponentContext.prototype.render = function (component) {
    return this.componentFactory.createComponent(component.type, {
        component,
        context: this
    });
};

ComponentContext.prototype.evaluateAction = function (evalString) {
    this.actionResolver.evaluateAction(evalString);
};

ComponentContext.prototype.evaluateAction = function (evalString) {
    this.actionResolver.evaluateAction(evalString);
};

ComponentContext.prototype.evaluateActions = function (evalList) {
    evalList.forEach(evalString => {
        this.evaluateAction(evalString);
    });
};

function Preview({ data, notifications, device }) {
    const deviceStyle = {
        width: `${device.width}px`,
        height: `${device.height}px`,
        margin: '20px auto',
        border: '16px solid black',
        borderRadius: '36px',
        boxShadow: '0 0 30px rgba(0, 0, 0, 0.5)',
        overflow: 'hidden',
        background: 'white',
    };

    const [screenStack, setScreenStack] = useState([data.initialScreen || '']);

    const onBackStackChanged = (prev, current) => {
        console.log(`backstack changed ${prev}; ${current}`);
    };

    const updateBackStack = useCallback((newBackStack) => {
        const currentBackStack = screenStack;

        newBackStack = typeof newBackStack === 'function' ? newBackStack(screenStack) : newBackStack;

        const oldTopmostScreen = currentBackStack.slice(-1);
        const newTopmostScreen = newBackStack.slice(-1);

        if (oldTopmostScreen !== newTopmostScreen) {
            onBackStackChanged(oldTopmostScreen, newTopmostScreen);
        }

        setScreenStack(newBackStack);
    }, [screenStack]);

    const componentFactory = useMemo(() => new ComponentFactory(), []);
    const componentContext = useMemo(() => {
        const context = new ComponentContext(
            componentFactory,
            createActionResolver({
                notifications: notifications,
                navigateToScreen: (screenName) => {
                    if (screenName === "back") {
                        updateBackStack(prevStack => prevStack.slice(0, prevStack.length - 1));
                    } else {
                        updateBackStack([screenName]);
                    }
                },
                pushScreen: (screenName) => {
                    updateBackStack(prevStack => [...prevStack, screenName]);
                },
            }),
        );

        return context;
    }, [componentFactory, notifications, updateBackStack]);

    ComponentContext.prototype.render = function (component) {
        return this.componentFactory.createComponent(component.type, {
            component,
            context: this
        });
    };

    const renderFlow = useCallback((flow) => {
        let initialScreen = flow.initialScreen;
        let screens = flow.screens || [];
        let currentScreen = screenStack.length > 0 ? screenStack[screenStack.length - 1] : initialScreen;
        let screen = screens.find((screen) => screen.tag === currentScreen);

        const goToStart = () => {
            updateBackStack([initialScreen]);
        };

        if (screen === undefined) {
            return <NoScreenError
                currentScreen={initialScreen}
                screens={screens.map((s) => s.tag)}
                goToStart={goToStart}
            />
        }

        return componentContext.render(screen);
    }, [componentContext, screenStack, updateBackStack]);

    const renderedFlow = useMemo(() => renderFlow(data || {}), [data, renderFlow]);

    return (
        <div style={deviceStyle}>
            <ErrorBoundary>
                {renderedFlow}
            </ErrorBoundary>
        </div>
    );
}

export default Preview;
