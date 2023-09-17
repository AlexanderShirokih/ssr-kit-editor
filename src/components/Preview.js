import React, { useCallback, useEffect, useMemo, useState } from 'react';
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

const findScreen = (data, screenTag) => {
    const screens = data.screens || [];
    const actualTag = (screenTag || data.initialScreen);
    return screens.find((s) => s.tag && s.tag === actualTag);
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

    const [screenStack, setScreenStack] = useState({
        backstack: [],
        backStackChangeCallbacks: [],
    });

    const onBackStackChanged = useCallback((prev, current) => {
        const prevScreen = findScreen(data, prev);
        const newScreen = findScreen(data, current);
        return {
            prevTag: prev,
            prevScreen: prevScreen,
            currentTag: current,
            currentScreen: newScreen,
        };
    }, [data]);

    const setBackStackChangeListener = useCallback((callback) => {
        setScreenStack({
            backstack: screenStack.backstack,
            backStackChangeCallbacks: [callback],
        });
    }, [screenStack]);

    const updateBackStack = useCallback((newBackStack) => {
        const currentBackStack = screenStack.backstack;

        newBackStack = typeof newBackStack === 'function' ? newBackStack(currentBackStack) : newBackStack;

        const oldTopmostScreen = currentBackStack.slice(-1).toString();
        const newTopmostScreen = newBackStack.slice(-1).toString();

        if (oldTopmostScreen !== newTopmostScreen) {
            const stackChangeResult = onBackStackChanged(oldTopmostScreen, newTopmostScreen);
            screenStack.backStackChangeCallbacks.forEach((callback) => {
                callback(stackChangeResult);
            });
        }

        setScreenStack({
            backstack: newBackStack,
            backStackChangeCallbacks: screenStack.backStackChangeCallbacks,
        });

    }, [screenStack, onBackStackChanged]);

    const componentContext = useMemo(() => {
        const context = new ComponentContext(
            new ComponentFactory(),
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
    }, [notifications, updateBackStack]);

    useEffect(() => {
        const callDisappearCallbacks = (screen) => {
            screen.disappearActions && componentContext.evaluateActions(screen.disappearActions);
        };
        const callAppearCallbacks = (screen) => {
            screen.appearActions && componentContext.evaluateActions(screen.appearActions)
        };

        setBackStackChangeListener((backStackChange) => {
            if (backStackChange.prevScreen) {
                callDisappearCallbacks(backStackChange.prevScreen);
            }

            if (backStackChange.currentScreen) {
                callAppearCallbacks(backStackChange.currentScreen);
            }
        });

        console.log("Initial: ");
        console.log(data.initialScreen);
       
        const initialScreen = findScreen(data, data.initialScreen);
        initialScreen && callAppearCallbacks(initialScreen);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    ComponentContext.prototype.render = function (component) {
        return this.componentFactory.createComponent(component.type, {
            component,
            context: this
        });
    };

    const renderFlow = useCallback((flow) => {
        let initialScreen = flow.initialScreen;
        let screens = flow.screens || [];
        let backStack = screenStack.backstack;
        let currentScreen = backStack.length > 0 ? backStack[backStack.length - 1] : initialScreen;
        let screen = findScreen(flow, currentScreen);

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
