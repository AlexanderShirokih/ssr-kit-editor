import ComponentContext from "./ComponentContext";
import { GenericComponent } from "./Components";

export type ComponentInput = {component: GenericComponent, context: ComponentContext}

export interface ReactComponentWithInput<T extends GenericComponent = GenericComponent> extends React.FC<ComponentInput & {component: T}> {}
