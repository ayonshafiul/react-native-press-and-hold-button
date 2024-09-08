/* eslint-disable react-native/no-inline-styles */
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
