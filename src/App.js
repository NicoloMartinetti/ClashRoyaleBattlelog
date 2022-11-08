import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import BattleLog from './screens/BattleLog';

const App = () => {
  return (
    <View style={styles.container}>
      <BattleLog/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;