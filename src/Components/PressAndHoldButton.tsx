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
  strokeColor: string;
  strokeLineCap: 'butt' | 'round' | 'square';
};

export type ButtonState = 'on' | 'off' | 'loading';

export type AnimationState = 'loading' | 'done';

export type PressAndHoldButtonProps = {
  renderChild?: (state: ButtonState) => ReactNode;
  containerStyle?: ViewStyle;
  size: number;
  circleProps?: CircleProps;
  onToggle: (state: ButtonState) => void;
  longPressDuration?: number;
};

export default function PressAndHoldButton({
  renderChild,
  circleProps = {
    strokeWidth: 10,
    strokeColor: 'black',
    strokeLineCap: 'round',
  },
  size = width - circleProps.strokeWidth,
  containerStyle,
  onToggle = () => {},
  longPressDuration = 1200,
}: PressAndHoldButtonProps) {
  const [buttonState, setButtonState] = useState<ButtonState>('off');
  const { Value, timing, spring, sequence, loop } = Animated;

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
  const scaleLoading = (state: AnimationState) => {
    if (state == 'loading') {
      loop(
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
        ])
      ).start();
    } else {
      timing(scale, {
        toValue: 1,
        duration: longPressDuration / 4,
        useNativeDriver: true,
      }).start();
    }
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
        let nextButtonState: ButtonState = buttonState === 'on' ? 'off' : 'on';
        scaleLoading('loading');
        try {
          await new Promise((resolve, _) =>
            setTimeout(resolve, longPressDuration / 2)
          );
          await onToggle(nextButtonState);
          setButtonState(nextButtonState);
        } catch (err) {
        } finally {
          scaleLoading('done');
        }
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
          strokeLinecap={circleProps.strokeLineCap}
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
          {typeof renderChild === 'function' ? renderChild(buttonState) : null}
        </View>
      </AnimatedSvg>
    </TouchableOpacity>
  );
}
