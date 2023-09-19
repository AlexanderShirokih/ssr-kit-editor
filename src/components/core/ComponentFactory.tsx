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
import { ComponentInput } from './ComponentInput';

interface ReactComponentWithInput extends React.FC<ComponentInput> {}  // Define the constraint

const COMPONENT_MAP: Record<string, ReactComponentWithInput> = {
  'RootView': RootView,
  'TopBar': TopBar,
  'Container': Container,
  'Center': Center,
  'BottomControl': BottomControl,
  'Button': Button,
  'Text': Text,
  'Image': ImageView,
  'Spacer': Spacer,
  'Icon': Icon,
  'Card': Card,
};

export type ComponentTypeMap = typeof COMPONENT_MAP;

class ComponentFactory {
  createComponent(type: string, props: ComponentInput): JSX.Element {
    const Component = COMPONENT_MAP[type]; // type error
  
    if (Component) {
      return <Component { ...props } />;
    }
    return <StubComponent type={ type } />;
  }
}

export default ComponentFactory;
