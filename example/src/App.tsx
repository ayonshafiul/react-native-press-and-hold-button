import { StyleSheet, View } from 'react-native';

import PressAndHoldButton from 'react-native-press-and-hold-button';

export default function App() {
  return (
    <View style={styles.container}>
      <PressAndHoldButton />
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
