import ActionResolver from "./ActionResolver";

function createActionResolver({ notifications, navigateToScreen, pushScreen }) {
    const resolver = new ActionResolver();
    resolver.registerResolver('analytics', analyticsResolver(notifications))
    resolver.registerResolver('deeplink', deeplinkResolver(notifications))
    resolver.registerResolver('navigate', navigationResolver(navigateToScreen))
    resolver.registerResolver('push', pushResolver(pushScreen))

    return resolver;
}

function navigationResolver(navigateToScreen) {
    return (params) => {
        const target = params['default'];
        navigateToScreen(target);
    };
}

function pushResolver(pushScreen) {
    return (params) => {
        const target = params['default'];
        pushScreen(target);
    };
}

function analyticsResolver(notifications) {
    return (params) => {
        const eventName = params['default'];
        delete params['default'];
        const eventParams = params;
        
        notifications.addNotification(
            'Метрика',
            `Отправка события метрики "${eventName}", параметры: ${JSON.stringify(eventParams)}"`
        );
    };
}

function deeplinkResolver(notifications) {
    return (params) => {
        const deeplinkTag = params['default'];
        delete params['default'];
        const deeplinkParams = params;
        
        notifications.addNotification(
            'Диплинк',
            `Переход на диплинк "${deeplinkTag}", параметры: ${JSON.stringify(deeplinkParams)}"`
        );
    };
}

export default createActionResolver;
