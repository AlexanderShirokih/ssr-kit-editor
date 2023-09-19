import React from 'react';

import StubComponent from "../preview/StubComponent";
import BottomControl from "../views/design-kit/ButtonControl";
import Button from "../views/design-kit/Button";
import Container from "../views/design-kit/Container";
import ImageView from "../views/design-kit/ImageView";
import RootView from "../views/design-kit/RootView";
import Spacer from "../views/design-kit/Spacer";
import Text from "../views/design-kit/Text";
import TopBar from "../views/design-kit/TopBar";
import Icon from "../views/design-kit/Icon";
import Center from "../views/design-kit/Center";
import Card from "../views/design-kit/Card";
import { ComponentInput, ReactComponentWithInput } from './ComponentInput';
import { GenericComponent, isButton, isRootView, isText, isTopBar } from './Components';

type ComponentBinding = {
  component: ReactComponentWithInput,
  matches: (component: GenericComponent) => boolean
};

const byType = (type: string) => ((component: GenericComponent) => component.type === type);

const COMPONENT_BINDINGS: ComponentBinding[] = [
  { component: RootView, matches: isRootView },
  { component: TopBar as ReactComponentWithInput, matches: isTopBar },
  { component: Container, matches: byType("Container") },
  { component: Center, matches: byType("Center") },
  { component: BottomControl, matches: byType("BottomControl") },
  { component: Button as ReactComponentWithInput, matches: isButton },
  { component: Text as ReactComponentWithInput, matches: isText },
  { component: ImageView, matches: byType("Image") },
  { component: Spacer, matches: byType("Spacer") },
  { component: Icon, matches: byType("Icon") },
  { component: Card, matches: byType("Card") },
];

class ComponentFactory {
  createComponent(type: string, props: ComponentInput): JSX.Element {
    const binding = COMPONENT_BINDINGS.find(b => b.matches(props.component));

    if (binding) {
      const Component = binding.component;
      return <Component {...props} />;
    }

    return <StubComponent type={type} />;
  }
}

export default ComponentFactory;
