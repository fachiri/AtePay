import React from 'react';
import { View, StyleSheet, BackHandler } from 'react-native';
import { WebView } from 'react-native-webview';
import { useRoute } from '@react-navigation/native';
import { handleBackPress } from '../helper/backHandler';
import { API_URL, URL, REDIRECT_URL } from '../env';

const BrowserView = ({ navigation }) => {
  const { paymentUrl } = useRoute().params;

  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => backHandler.remove();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: paymentUrl }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default BrowserView;
