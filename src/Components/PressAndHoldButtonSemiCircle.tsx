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

const w = Dimensions.get('window').width;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export type CircleProps = {
  strokeWidth: number;
  strokeColor: string;
  strokeLineCap: 'butt' | 'round' | 'square';
};

export type AnimationState = 'loading' | 'done';
export type LoadingAnimation = 'scale' | 'bounce';

export type PressAndHoldButtonSemiCircleProps = {
  renderChild?: (state: boolean, isLoading: boolean) => ReactNode;
  containerStyle?: ViewStyle;
  width: number;
  height: number;
  circleProps?: CircleProps;
  onToggle: (state: boolean) => void;
  onError?: (err: any) => void;
  longPressDuration?: number;
  loadingAnimationEnabled?: boolean;
  loadingAnimation?: LoadingAnimation;
};

export default function PressAndHoldButtonSemiCircle({
  renderChild,
  circleProps = {
    strokeWidth: 10,
    strokeColor: 'black',
    strokeLineCap: 'round',
  },
  width = w - 32,
  height = 150,
  containerStyle,
  onToggle = () => {},
  onError = (_: any) => {},
  longPressDuration = 1200,
  loadingAnimation = 'bounce',
  loadingAnimationEnabled = true,
}: PressAndHoldButtonSemiCircleProps) {
  const [isOn, setIsOn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { Value, timing, spring, sequence, loop } = Animated;

  const progress = useRef(new Value(0)).current;
  const bounce = useRef(new Value(0)).current;
  const scale = useRef(new Value(1)).current;
  const radius = width;
  const circumference = radius * 2 * Math.PI;

  const strokeDashoffset = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  const animatePressIn = () => {
    timing(progress, {
      toValue: 1,
      duration: longPressDuration * 2,
      useNativeDriver: true,
    }).start();
  };
  const animatePressOut = () => {
    timing(progress, {
      toValue: 0,
      duration: longPressDuration / 2,
      useNativeDriver: true,
    }).start();
  };
  const runLoadingAnimation = (state: AnimationState) => {
    if (!loadingAnimationEnabled) {
      return;
    }
    if (state === 'loading') {
      if (loadingAnimation === 'scale') {
        loop(
          sequence([
            spring(scale, {
              toValue: 1.05,
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
        loop(
          sequence([
            timing(bounce, {
              toValue: -10, // Move 10 units to the right
              duration: 450, // Faster movement
              useNativeDriver: true,
            }),
            timing(bounce, {
              toValue: 10, // Move 10 units to the left
              duration: 110, // Faster movement
              useNativeDriver: true,
            }),
            timing(bounce, {
              toValue: 0, // Move back to the original position
              duration: 150, // Faster movement
              useNativeDriver: true,
            }),
          ])
        ).start();
      }
    } else {
      if (loadingAnimation === 'scale') {
        timing(scale, {
          toValue: 1,
          duration: longPressDuration / 4,
          useNativeDriver: true,
        }).start();
      } else {
        timing(bounce, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
    }
  };

  return (
    <TouchableOpacity
      style={[
        {
          width: width,
          height: height,
          position: 'relative',
          justifyContent: 'center',
          alignItems: 'center',
        },
        containerStyle,
      ]}
      onLongPress={async () => {
        let nextButtonState: boolean = !isOn;
        runLoadingAnimation('loading');
        setIsLoading(true);
        try {
          await new Promise((resolve, _) =>
            setTimeout(resolve, longPressDuration / 2)
          );
          await onToggle(nextButtonState);
          setIsOn(nextButtonState);
        } catch (err: any) {
          onError(err);
        } finally {
          setIsLoading(false);
          runLoadingAnimation('done');
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
        width={width}
        height={height}
        style={{
          transform: [{ scale: scale }, { translateY: bounce }],
          backgroundColor: 'magenta',
        }}
      >
        <AnimatedCircle
          fill="none"
          cx={width / 2}
          cy={height / 2}
          r={radius}
          stroke={circleProps.strokeColor}
          strokeLinecap={circleProps.strokeLineCap}
          strokeWidth={circleProps.strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-180 ${width / 2} ${height / 2}) translate(0 ${-radius})`}
        />
        <Circle
          fill="yellow"
          cx={width / 2}
          cy={height / 2}
          r={radius * 0.98}
          transform={`rotate(-180 ${width / 2} ${height / 2}) translate(0 ${-radius})`}
        />
        <View
          style={{
            width: width,
            height: height,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {typeof renderChild === 'function'
            ? renderChild(isOn, isLoading)
            : null}
        </View>
      </AnimatedSvg>
    </TouchableOpacity>
  );
}
