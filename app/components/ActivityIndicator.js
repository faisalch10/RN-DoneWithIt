import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import colors from '../config/colors';

const ActivityIndicator = ({ visible = false }) => {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <LottieView
        autoPlay
        loop
        source={require('../assets/animations/loader.json')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    height: '100%',
    width: '100%',
    backgroundColor: colors.white,
    position: 'absolute',
    zIndex: 1,
    opacity: 0.8,
  },
});

export default ActivityIndicator;
