/* eslint-disable react-native/no-inline-styles */
import { Dimensions, StyleSheet, Text, View } from 'react-native';

import { PressAndHoldButtonSemiCircle } from 'react-native-press-and-hold-button';
const width = Dimensions.get('window').width;

export default function App() {
  return (
    <View style={styles.container}>
      <PressAndHoldButtonSemiCircle
        width={width}
        height={100}
        onToggle={async () => {
          // simulate long api calls waiting time
          await new Promise((resolve, _) => setTimeout(resolve, 5000));
          // error out the response
          // throw new Error('Simulate error');
        }}
        onError={(err) => console.log((err as Error).message)}
        renderChild={(isOn: boolean, isLoading: boolean) => {
          return (
            <Text style={{ color: 'white' }}>
              {isLoading
                ? 'Loading...'
                : isOn
                  ? 'Button is On'
                  : 'Button is Off'}
            </Text>
          );
        }}
        circleProps={{
          strokeWidth: 5,
          strokeColor: 'black',
          strokeLineCap: 'round',
          semiCircleColor: 'red',
          semiCircleOffset: 34,
        }}
        loadingAnimation="scale"
        longPressDuration={2000}
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
