import { DeviceType } from '../../core/DeviceType';

const Platform = ({ component, context }) => {
    const { android, ios } = component;

    switch (context.getDevice()) {
        case DeviceType.IOS:
            return ios ? context.render(ios) : null;
        case DeviceType.ANDROID:
        default:
            return android ? context.render(android) : null;
    }
};

export default Platform;
