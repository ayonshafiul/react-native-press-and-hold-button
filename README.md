# react-native-press-and-hold-button

A big press and hold button component for React native

## Installation

```sh
yarn add react-native-press-and-hold-button
```

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

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
