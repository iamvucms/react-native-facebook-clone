import debounce from 'lodash.debounce';
import React, { PureComponent } from 'react'
import { TouchableOpacity } from 'react-native'
const withPreventDoubleClick = (WrappedComponent) => {
    class PreventDoubleClick extends React.PureComponent {
        debouncedOnPress = () => {
            this.props.onPress && this.props.onPress();
        }
        onPress = debounce(this.debouncedOnPress, 500, { leading: true, trailing: false });
        render() {
            return <WrappedComponent activeOpacity={0.6} {...this.props} onPress={this.onPress}>{this.props.children}</WrappedComponent>;
        }
    }
    PreventDoubleClick.displayName = `withPreventDoubleClick(${WrappedComponent.displayName || WrappedComponent.name})`
    return PreventDoubleClick;
}
export default withPreventDoubleClick(TouchableOpacity)