import * as React from 'react';
import { View, Text, StatusBar, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { ImageSlider } from "react-native-image-slider-banner";
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({navigation}) => {
  const height = Dimensions.get('window').width * (9 / 16);

  React.useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    // Check if the login token exists in AsyncStorage
    const token = await AsyncStorage.getItem('token');

    // If the token does not exist, navigate to the Login screen
    if (!token) {
      navigation.navigate('Login');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white',  padding: 15 }}>
      {/* <StatusBar
        animated={true}
        backgroundColor="#61dafb"
      /> */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
        <View>
          <Text>Halo Alp.!</Text>
          <View>
            <Text>Saldo Rp. 5000</Text>
            <Text>Top Up Saldo</Text>
          </View>
        </View>
        <FontAwesome5 name={'bell'} size={30} />
      </View>
      <View style={{ borderWidth: 1, height, borderRadius: 15, overflow: 'hidden', marginBottom: 30 }}>
        <ImageSlider
          data={[
              {img: 'https://images.unsplash.com/photo-1483181957632-8bda974cbc91?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'},
              {img: 'https://images.unsplash.com/photo-1534349735944-2b3a6f7a268f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'},
              {img: 'https://images.unsplash.com/photo-1513451732213-5775a1c40335?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80'},
          ]}
          autoPlay={true}
          closeIconColor="#fff"
          caroselImageStyle={{ borderWidth: 1 }}
        />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 30 }}>
        <View style={{ flexDirection: 'column', alignItems: 'center', width: '20%' }}>
          <View style={{marginBottom: 10}}>
            <FontAwesome5 name={'mobile-alt'} size={30} />
          </View>
          <Text style={{ textAlign: 'center' }}>Pulsa & Data</Text>
        </View>
        <View style={{ flexDirection: 'column', alignItems: 'center', width: '20%' }}>
          <View style={{marginBottom: 10}}>
            <FontAwesome5 name={'lightbulb'} size={30} />
          </View>
          <Text style={{ textAlign: 'center' }}>Listrik</Text>
        </View>
        <View style={{ flexDirection: 'column', alignItems: 'center', width: '20%' }}>
          <FontAwesome5 name={'faucet'} size={30} style={{marginBottom: 10}} />
          <Text style={{ textAlign: 'center' }}>Air PAM</Text>
        </View>
        <View style={{ flexDirection: 'column', alignItems: 'center', width: '20%' }}>
          <FontAwesome5 name={'mobile-alt'} size={30} style={{marginBottom: 10}} />
          <Text style={{ textAlign: 'center' }}>Pulsa & Data</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 30 }}>
        <View style={{ flexDirection: 'column', alignItems: 'center', width: '20%' }}>
          <FontAwesome5 name={'lightbulb'} size={30} style={{marginBottom: 10}} />
          <Text style={{ textAlign: 'center' }}>Listrik</Text>
        </View>
        <View style={{ flexDirection: 'column', alignItems: 'center', width: '20%' }}>
          <FontAwesome5 name={'faucet'} size={30} style={{marginBottom: 10}} />
          <Text style={{ textAlign: 'center' }}>Air PAM</Text>
        </View>
        <View style={{ flexDirection: 'column', alignItems: 'center', width: '20%' }}>
          <FontAwesome5 name={'faucet'} size={30} style={{marginBottom: 10}} />
          <Text style={{ textAlign: 'center' }}>Air PAM</Text>
        </View>
        <View style={{ flexDirection: 'column', alignItems: 'center', width: '20%' }}>
          <FontAwesome5 name={'th'} size={30} style={{marginBottom: 10}} />
          <Text style={{ textAlign: 'center' }}>Lihat Semua</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen