import * as React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, ImageBackground, ActivityIndicator, Pressable, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { ImageSlider } from "react-native-image-slider-banner";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { API_URL, URL } from '@env';
import axios from "axios";
import { getIDR } from '../helper/numberFormat'
import { getGreeting } from '../helper/dateFormat'

const HomeScreen = ({navigation}) => {
  const [user, setUser] = React.useState({})
  const height = Dimensions.get('window').width * (6 / 16);
  const isFocused = useIsFocused();
  const [isScreenLoading, setIsScreenLoading] = React.useState(true);
  const [balance, setBalance] = React.useState('')
  const [refreshing, setRefreshing] = React.useState(false);
  const [sliders, setSliders] = React.useState([])
  const [greeting, setGreeting] = React.useState('')

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setIsScreenLoading(true);
    getData().finally(() => setRefreshing(false));
  }, []);

  React.useEffect(() => {
    if (isFocused) {
      setIsScreenLoading(true);
      getData();
    }
  }, [isFocused]);

  const getData = async () => {
    try {
      console.log('--- getData() ---')
      const dataUser = await AsyncStorage.getItem('user');
      const token = await AsyncStorage.getItem('token');
      setUser(JSON.parse(dataUser));
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const balance = await axios.get(`${URL}/${API_URL}/payment/my-balance?user_id=${JSON.parse(dataUser).id}`, config);
      const sliders = await axios.get(`${URL}/${API_URL}/setting/sliders`, config);
      let arr_sliders = []
      sliders.data.data.forEach(e => {
        arr_sliders[e.order] = { img: `${URL}/uploads/sliders/${e.name}` }
      });
      setBalance(balance.data.balance);
      setSliders(arr_sliders);
      setGreeting(getGreeting())
    } catch (error) {
      console.log('Error fetching data:', error);
    } finally {
      setIsScreenLoading(false);
    }
  };

  if (isScreenLoading) {
    return (
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#48C239" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1}}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ flex: 1, alignItems: 'stretch' }}>
          <View style={{ backgroundColor: '#48C239', flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, paddingTop: 30, alignItems: 'center', paddingBottom: 15 }}>
            <View>
              <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 22 }}>{greeting}</Text>
              <Text style={{ color: '#FFF', fontWeight: '600' }}>{user.name}</Text>
            </View>
            <Pressable
              onPress={() => navigation.navigate('Notification')}
            >
              <View style={{ backgroundColor: '#FFF', padding: 5, borderRadius: 5 }}>
                <FontAwesome5 name={'bell'} size={25} color='#48C239' />
              </View>
            </Pressable>
          </View>
          <ImageBackground 
            style={{ flex: 1, alignItems: 'center', paddingHorizontal: 15, paddingBottom: 5, marginBottom: 15 }}
            source={require('../assets/bg1.png')}
          >
            <View style={[styles.card, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 0}]}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: '#9e9e9e', fontSize: 13 }}>Rp</Text>
                <Text style={{ fontSize: 20, marginLeft: 5 }}>{getIDR(balance).replace(/Rp|,\d{2}$/g, "")}</Text>
              </View>
              <Pressable style={{ backgroundColor: '#48C239', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 5, flexDirection: 'row' }} onPress={() => navigation.navigate('Topup')}>
                <FontAwesome5 name={'plus-circle'} size={18} color='#FFF' />
                <Text style={{ color: '#FFF', fontWeight: '600', marginLeft: 8 }}>Isi Saldo</Text>
              </Pressable>
            </View>
          </ImageBackground>
          <View style={{ paddingHorizontal: 15 }}>
            <View style={styles.card}>
              <View style={{ height, borderRadius: 15, overflow: 'hidden', marginBottom: 30}}>
                <ImageSlider
                  data={sliders}
                  autoPlay={true}
                  closeIconColor="#fff"
                  timer={5000}
                  caroselImageStyle={{ borderWidth: 1, resizeMode: 'center' }}
                  activeIndicatorStyle={{ backgroundColor: '#48C239' }}
                  indicatorContainerStyle={{ bottom: 0 }}
                />
              </View>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', marginBottom: 30 }}>
                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', width: '20%' }}>
                  <View style={{width: 40, height: 40, borderWidth: 1}}>
                    <FontAwesome5 name={'mobile-alt'} size={30} style={{ textAlign: 'center' }} />
                  </View>
                  <Text style={{ textAlign: 'center' }}>Pulsa & Data</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', width: '20%' }}>
                  <View style={{width: 40, height: 40, borderWidth: 1}}>
                    <FontAwesome5 name={'lightbulb'} size={30} style={{ textAlign: 'center' }} />
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

            </View>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 1, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    padding: 20,
    marginBottom: 10
  },
  pressable: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  pressableActive: {
    backgroundColor: '#00000010',
    borderRadius: 10,
  },
});

export default HomeScreen