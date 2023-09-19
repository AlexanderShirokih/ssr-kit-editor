import ActionResolver from "./ActionResolver";
import ComponentFactory from "./ComponentFactory";
import { GenericComponent } from "./Components";
import { DeviceType } from "./DeviceType";

class ComponentContext {
    private componentFactory: ComponentFactory;
    private actionResolver: ActionResolver;
    private device: DeviceType;

    constructor(
        componentFactory: ComponentFactory,
        actionResolver: ActionResolver,
        device: DeviceType
    ) {
        this.componentFactory = componentFactory;
        this.actionResolver = actionResolver;
        this.device = device;
    }

    getComponentFactory(): ComponentFactory {
        return this.componentFactory;
    }

    getActionResolver(): ActionResolver {
        return this.actionResolver;
    }

    getDevice(): DeviceType {
        return this.device;
    }

    render(component: GenericComponent) {
        return this.componentFactory.createComponent(component.type, {
            component: component,
            context: this
        });
    };

    evaluateAction(evalString: string) {
        this.actionResolver.evaluateAction(evalString);
    };

    evaluateActions(evalList: string[]) {
        evalList.forEach(evalString => {
            this.evaluateAction(evalString);
        });
    };
}

export default ComponentContext;
