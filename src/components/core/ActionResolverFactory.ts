import ActionResolver from "./ActionResolver";

export type OnNavigate = (screenName: string) => void;

export interface FactoryArgs {
    notifications: NotificationsController;
    navigateToScreen: OnNavigate;
    pushScreen: OnNavigate;
}

function createActionResolver({ notifications, navigateToScreen, pushScreen }: FactoryArgs): ActionResolver {
    const resolver = new ActionResolver();

    resolver.registerResolver('analytics', analyticsResolver(notifications));
    resolver.registerResolver('deeplink', deeplinkResolver(notifications));
    resolver.registerResolver('navigate', navigationResolver(navigateToScreen));
    resolver.registerResolver('push', pushResolver(pushScreen));

    return resolver;
}

function navigationResolver(navigateToScreen: OnNavigate): (params: Record<string, string>) => void {
    return (params) => {
        const target = params['default'];
        navigateToScreen(target);
    };
}

function pushResolver(pushScreen: OnNavigate): (params: Record<string, string>) => void {
    return (params) => {
        const target = params['default'];
        pushScreen(target);
    };
}

function analyticsResolver(notifications: NotificationsController): (params: Record<string, string>) => void {
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

function deeplinkResolver(notifications: NotificationsController): (params: Record<string, string>) => void {
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
