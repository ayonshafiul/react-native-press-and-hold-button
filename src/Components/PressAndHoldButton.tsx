import { useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Circle, Svg } from 'react-native-svg';

import { Animated } from 'react-native';

const { width } = Dimensions.get('window');

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function PressAndHoldButton() {
  const { Value, timing } = Animated;

  const progress = new Value(0);

  const size = width - 32;
  const strokeWidth = 50;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  const strokeDashoffset = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  useEffect(() => {
    timing(progress, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <Svg width={size} height={size} style={{ backgroundColor: 'green' }}>
        <AnimatedCircle
          stroke="#ff0"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={10}
          strokeLinecap={'round'}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
