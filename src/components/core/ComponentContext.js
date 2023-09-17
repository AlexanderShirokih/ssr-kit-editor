
class ComponentContext {
    constructor(componentFactory, actionResolver) {
        this.componentFactory = componentFactory;
        this.actionResolver = actionResolver;
    }

    getComponentFactory() {
        return this.componentFactory;
    }

    getActionResolver() {
        return this.actionResolver;
    }
}

export default ComponentContext;
