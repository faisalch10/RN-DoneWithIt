import { Text, StyleSheet, Platform } from 'react-native';

import defaultStyles from '../config/styles';

const AppText = ({ children, style, ...otherProps }) => {
  return (
    <Text {...otherProps} style={[defaultStyles.text, style]}>
      {children}
    </Text>
  );
};

export default AppText;
