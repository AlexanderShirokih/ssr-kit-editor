export type GenericComponent = {
    type: string;
    tag: string;
    [key: string]: unknown;
};

export type RootViewComponent = GenericComponent & {
    type: 'RootView';
    appearActions?: ActionsSet;
    disappearActions?: ActionsSet;
};

export function isRootView(component: GenericComponent): component is RootViewComponent {
    return component.type === 'RootView';
}

export type ActionsSet = string[]

export interface ScreensSet {
    initialScreen: string;
    screens: GenericComponent[];
}

