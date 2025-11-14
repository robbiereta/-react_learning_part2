import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import SmartwatchApp from './src/SmartwatchApp';

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />
      <SmartwatchApp />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#764ba2',
  },
});

export default App;
