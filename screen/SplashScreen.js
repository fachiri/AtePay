import * as React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SplashScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#48C239' }}>
        <ActivityIndicator size="large" color='#FFF' />
      </View>
    </SafeAreaView>
  );
}


export default SplashScreen