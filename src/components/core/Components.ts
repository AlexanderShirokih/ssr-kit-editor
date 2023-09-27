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

export type TopBarComponent = GenericComponent & {
    type: 'TopBar';
    title?: string;
}

export function isTopBar(component: GenericComponent): component is TopBarComponent {
    return component.type === 'TopBar';
}

export type TextComponent = GenericComponent & {
    type: 'Text';
    style?: string;
    color?: string;
    content?: string;
}

export function isText(component: GenericComponent): component is TextComponent {
    return component.type === 'Text';
}

export type ButtonComponent = GenericComponent & {
    type: 'Button';
    content?: string;
    style?: string;
    tapActions?: ActionsSet;
}

export function isButton(component: GenericComponent): component is ButtonComponent {
    return component.type === 'Button';
}

export type CheckboxComponent = GenericComponent & {
    type: 'Checkbox';
    required?: boolean;
    default?: boolean;
}
export function isCheckbox(component: GenericComponent): component is CheckboxComponent {
    return component.type === 'Checkbox';
}

export type ActionsSet = string[]

export interface ScreensSet {
    initialScreen: string;
    screens: GenericComponent[];
}

