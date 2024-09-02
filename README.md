# react-native-press-and-hold-button

A big press and hold button component for React native

## Installation

```sh
yarn add react-native-press-and-hold-button
```

## Demo (click to play)

<video width="300" height="600" controls>
  <source src="https://peyara-remote-mouse.vercel.app/press-and-hold-button.mp4" type="video/mp4">
Your browser does not support the video tag.
</video>

## Usage

```js
/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, Text, View } from 'react-native';

import PressAndHoldButton from 'react-native-press-and-hold-button';

export default function App() {
  return (
    <View style={styles.container}>
      <PressAndHoldButton
        size={200}
        onToggle={(isOn) => {
          console.log('isOn', isOn);
          // do stuff here with the button state
        }}
        renderChild={(isOn) => {
          return (
            <View
              style={[
                {
                  backgroundColor: isOn ? 'green' : 'red',
                  width: 160,
                  height: 160,
                  borderRadius: 80,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}
            >
              <Text style={{ color: 'white' }}>
                {isOn ? 'Button is On' : 'Button is Off'}
              </Text>
            </View>
          );
        }}
        circleProps={{
          strokeWidth: 5,
          strokeColor: 'black',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```

## Props

| Prop                | Type                           | Description                                                                                                           | Required |
| ------------------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------- | -------- |
| **`size`**          | `number`                       | The size of the button (width and height).                                                                            | Yes      |
| **`onToggle`**      | `(isOn: boolean) => void`      | Callback function that is triggered when the button is toggled.                                                       | Yes      |
| `renderChild`       | `(isOn: boolean) => ReactNode` | A function that renders a child component based on the `isOn` state. If not provided, no child component is rendered. | No       |
| `containerStyle`    | `ViewStyle`                    | Style object to apply to the container of the button.                                                                 | No       |
| `circleProps`       | `CircleProps`                  | Props to be passed to the circle element inside the button.                                                           | No       |
| `longPressDuration` | `number`                       | Duration (in milliseconds) that defines how long the button must be pressed to trigger a long press.                  | No       |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
