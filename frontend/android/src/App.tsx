import React from 'react';
import { SafeAreaView, StatusBar, Text, View } from 'react-native';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>爻星阁</Text>
        <Text style={{ marginTop: 8 }}>Android 版本</Text>
      </View>
    </SafeAreaView>
  );
};

export default App; 