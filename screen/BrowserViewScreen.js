import React from 'react';
import { View, StyleSheet, BackHandler } from 'react-native';
import { WebView } from 'react-native-webview';
import { useRoute } from '@react-navigation/native';
import { handleBackPress } from '../helper/backHandler';
import { API_URL, URL, REDIRECT_URL } from '../env';

const BrowserView = ({ navigation }) => {
  const { paymentUrl } = useRoute().params;
  const [browserUrl, setBrowserUrl] = React.useState(paymentUrl)

  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => backHandler.remove();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: browserUrl }}
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
