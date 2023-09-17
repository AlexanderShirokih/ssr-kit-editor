import StubComponent from "../StubComponent";
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

const COMPONENT_MAP = {
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
};

class ComponentFactory {
    createComponent(type, props) {
        const Component = COMPONENT_MAP[type];

        if (!Component) {
            return <StubComponent type={type} />
        }

        return <Component {...props} />;
    }
}

export default ComponentFactory;
