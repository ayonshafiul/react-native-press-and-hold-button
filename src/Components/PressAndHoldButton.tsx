/* eslint-disable react-native/no-inline-styles */
import { useRef, useState, type ReactNode } from 'react';
import {
  Dimensions,
  type ViewStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import { Circle, Svg } from 'react-native-svg';

import { Animated } from 'react-native';

const { width } = Dimensions.get('window');

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export type CircleProps = {
  strokeWidth: number;
  strokeColor?: string;
};

export type PressAndHoldButtonProps = {
  renderChild?: (isOn: boolean) => ReactNode;
  containerStyle?: ViewStyle;
  size: number;
  circleProps?: CircleProps;
  onToggle: (isOn: boolean) => void;
  longPressDuration?: number;
};

export default function PressAndHoldButton({
  renderChild,

  circleProps = {
    strokeWidth: 10,
    strokeColor: 'black',
  },
  size = width - circleProps.strokeWidth,
  containerStyle,
  onToggle = () => {},
  longPressDuration = 1200,
}: PressAndHoldButtonProps) {
  const [isOn, setIsOn] = useState<boolean>(true);
  const { Value, timing, spring, sequence } = Animated;

  const progress = useRef(new Value(0)).current;
  const scale = useRef(new Value(1)).current;
  const radius = (size - circleProps.strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  const strokeDashoffset = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  const animatePressIn = () => {
    timing(progress, {
      toValue: 1,
      duration: longPressDuration,
      useNativeDriver: true,
    }).start();
  };
  const animatePressOut = () => {
    timing(progress, {
      toValue: 0,
      duration: longPressDuration / 4,
      useNativeDriver: true,
    }).start();
  };
  const scaleComplete = (toggleValue: boolean) => {
    sequence([
      spring(scale, {
        toValue: 1.1,
        speed: 10,
        useNativeDriver: true,
      }),
      spring(scale, {
        toValue: 1,
        speed: 10,
        useNativeDriver: true,
      }),
      timing(progress, {
        toValue: 0,
        duration: longPressDuration / 4,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsOn(toggleValue);
    });
  };

  return (
    <TouchableOpacity
      style={[
        {
          width: size,
          height: size,
          position: 'relative',
          justifyContent: 'center',
          alignItems: 'center',
        },
        containerStyle,
      ]}
      onLongPress={async () => {
        await onToggle(!isOn);
        scaleComplete(!isOn);
      }}
      delayLongPress={longPressDuration}
      onPressIn={() => {
        animatePressIn();
      }}
      onPressOut={() => {
        animatePressOut();
      }}
      activeOpacity={1}
    >
      <AnimatedSvg
        width={size}
        height={size}
        style={{ transform: [{ scale: scale }] }}
      >
        <AnimatedCircle
          stroke={circleProps.strokeColor}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={circleProps.strokeWidth}
          strokeLinecap={'round'}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        <View
          style={{
            width: size,
            height: size,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {typeof renderChild === 'function' ? renderChild(isOn) : null}
        </View>
      </AnimatedSvg>
    </TouchableOpacity>
  );
}
