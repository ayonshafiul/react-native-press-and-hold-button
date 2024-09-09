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
        size={190}
        onToggle={async () => {
          // simulate long api calls waiting time
          await new Promise((resolve, _) => setTimeout(resolve, 5000));
          // error out the response
          // throw new Error('Simulate error');
        }}
        onError={(err) => console.log((err as Error).message)}
        renderChild={(isOn: boolean, isLoading: boolean) => {
          return (
            <View
              style={[
                {
                  backgroundColor: isLoading
                    ? '#B2BEB5'
                    : isOn
                      ? 'green'
                      : 'red',
                  width: 160,
                  height: 160,
                  borderRadius: 80,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}
            >
              <Text style={{ color: 'white' }}>
                {isLoading
                  ? 'Loading...'
                  : isOn
                    ? 'Button is On'
                    : 'Button is Off'}
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

| **Prop Name**           | **Type**                                          | **Required** | **Description**                                     |
| ----------------------- | ------------------------------------------------- | ------------ | --------------------------------------------------- |
| **size**                | number                                            | Yes          | Specifies the size of the button.                   |
| **onToggle**            | (state: boolean) => void                          | Yes          | Function called when the button is toggled.         |
| renderChild             | (state: boolean, isLoading: boolean) => ReactNode | No           | Optional function to render custom child content.   |
| containerStyle          | ViewStyle                                         | No           | Style for the button container.                     |
| circleProps             | CircleProps                                       | No           | Optional props for the circle component.            |
| onError                 | (err: any) => void                                | No           | Callback for handling errors.                       |
| longPressDuration       | number                                            | No           | Duration (in ms) to trigger the long press event.   |
| loadingAnimationEnabled | boolean                                           | No           | Enables or disables the loading animation.          |
| loadingAnimation        | 'scale' \| 'bounce'                               | No           | Specifies the type of loading animation if enabled. |

`CircleProps`

| **Prop Name**     | **Type**                      | **Required** | **Description**                             |
| ----------------- | ----------------------------- | ------------ | ------------------------------------------- |
| **strokeWidth**   | number                        | Yes          | Specifies the width of the circle's stroke. |
| **strokeColor**   | string                        | Yes          | Defines the color of the circle's stroke.   |
| **strokeLineCap** | 'butt' \| 'round' \| 'square' | Yes          | Determines the shape of the stroke ends.    |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
