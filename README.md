# react-native-press-and-hold-button

A big press and hold button component for React native

## Installation

If you're using expo, `react-native-svg` is already included with the expo client, so no need to do anything.

If you're using react-native-cli and haven't setup `react-native-svg` make sure to follow [Installation](https://www.npmjs.com/package/react-native-svg#installation) steps first

```sh
yarn add react-native-press-and-hold-button
```

Or

```sh
npm install react-native-press-and-hold-button
```

![npm](https://img.shields.io/npm/v/react-native-press-and-hold-button)
![NPM](https://img.shields.io/npm/l/react-native-press-and-hold-button)
![GitHub issues](https://img.shields.io/github/issues/ayonshafiul/react-native-press-and-hold-button)
![npm bundle size](https://img.shields.io/bundlephobia/min/react-native-press-and-hold-button)
![npm](https://img.shields.io/npm/dw/react-native-press-and-hold-button)
![GitHub forks](https://img.shields.io/github/forks/ayonshafiul/react-native-press-and-hold-button)
![GitHub Repo stars](https://img.shields.io/github/stars/ayonshafiul/react-native-press-and-hold-button)

![Image](https://peyara-remote-mouse.vercel.app/press-and-hold-button.gif)

## Usage

```js
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
          strokeLineCap: 'round',
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

| Property            | Type                                | Required | Description                                                               |
| ------------------- | ----------------------------------- | -------- | ------------------------------------------------------------------------- |
| **`size`**          | `number`                            | **Yes**  | The size of the button.                                                   |
| **`onToggle`**      | `(state: ButtonState) => void`      | **Yes**  | A function that is called when the button's state is toggled.             |
| `renderChild`       | `(state: ButtonState) => ReactNode` | No       | A function that takes the `ButtonState` and returns a ReactNode.          |
| `containerStyle`    | `ViewStyle`                         | No       | Optional style for the container.                                         |
| `circleProps`       | `CircleProps`                       | No       | Optional properties for the circle element (assumed to be a custom type). |
| `longPressDuration` | `number`                            | No       | The duration (in milliseconds) for the long press to be recognized.       |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
