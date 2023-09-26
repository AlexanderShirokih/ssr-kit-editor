import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ComponentFactory from '../core/ComponentFactory';
import ComponentContext from '../core/ComponentContext';
import createActionResolver from '../core/ActionResolverFactory';
import { BackStackChangeCallback, BackStackChangeEntry, ScreenStackType } from './BackStack';
import Device from './Device';
import { RootViewComponent, ScreensSet, isRootView } from '../core/Components';
import ErrorBoundary from './ErrorBoundary';
import NoScreenError from './NoScreenError';

const findScreen = (data: ScreensSet, screenTag: string) => {
    const screens = data.screens || [];
    const actualTag = (screenTag || data.initialScreen);
    return screens.find((s) => s.tag && s.tag === actualTag);
};

interface PreviewProps {
    data: ScreensSet;
    notifications: NotificationsController;
    device: Device;
    scale: number;
}

type SetScreenStack = string[] | ((prevStack: string[]) => string[])

function Preview({ data, notifications, device, scale = 1.0 }: PreviewProps) {
    const deviceStyle = {
        transform: `scale(${scale})`,
        transformOrigin: 'top',
        width: `${device.width}px`,
        height: `${device.height}px`,
        margin: '20px auto',
        border: '16px solid black',
        borderRadius: '36px',
        boxShadow: '0 0 30px rgba(0, 0, 0, 0.5)',
        overflow: 'hidden',
        background: 'white',
    };

    const [screenStack, setScreenStack] = useState<ScreenStackType>({
        backstack: [],
        backStackChangeCallbacks: [],
    });

    const onBackStackChanged = useCallback((prev: string, current: string): BackStackChangeEntry => {
        const prevScreen = findScreen(data, prev);
        const newScreen = findScreen(data, current);
        return {
            prevTag: prev,
            prevScreen: prevScreen,
            currentTag: current,
            currentScreen: newScreen,
        };
    }, [data]);

    const setBackStackChangeListener = useCallback((callback: BackStackChangeCallback) => {
        setScreenStack({
            backstack: screenStack.backstack,
            backStackChangeCallbacks: [callback],
        });
    }, [screenStack]);

    const updateBackStack = useCallback((newBackStack: SetScreenStack) => {
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
                navigateToScreen: (screenName: string) => {
                    if (screenName === "back") {
                        updateBackStack(prevStack => prevStack.slice(0, prevStack.length - 1));
                    } else {
                        updateBackStack([screenName]);
                    }
                },
                pushScreen: (screenName: string) => {
                    updateBackStack(prevStack => [...prevStack, screenName]);
                },
            }),
            device.appearance,
        );

        return context;
    }, [notifications, updateBackStack, device.appearance]);

    useEffect(() => {
        const callDisappearCallbacks = (screen: RootViewComponent) => {
            const disappearActions = screen.disappearActions;
            disappearActions && componentContext.evaluateActions(disappearActions);
        };
        const callAppearCallbacks = (screen: RootViewComponent) => {
            const appearActions = screen.disappearActions;
            appearActions && componentContext.evaluateActions(appearActions)
        };

        setBackStackChangeListener((backStackChange) => {
            if (backStackChange.prevScreen) {
                const prev = backStackChange.prevScreen;
                if (isRootView(prev)) {
                    callDisappearCallbacks(prev);
                }
            }

            if (backStackChange.currentScreen && isRootView(backStackChange.currentScreen)) {
                callAppearCallbacks(backStackChange.currentScreen);
            }
        });

        const initialScreen = findScreen(data, data.initialScreen);
        initialScreen && isRootView(initialScreen) && callAppearCallbacks(initialScreen);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderFlow = useCallback((flow: ScreensSet) => {
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
                screens={screens.map((s) => s.tag || 'undefined')}
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
