import * as React from 'react';
import { View, Text, TextInput, Pressable, Image, Alert, ActivityIndicator, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { handleBackPress } from '../helper/backHandler';
import { API_URL, URL } from '../env';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    checkToken();
    return () => backHandler.remove();
  }, []);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      navigation.navigate('Main');
    }
  };

  const handleLogin = async () => {
    console.log('--- handleLogin() ---')
    setIsLoading(true)
    if (email == '' || password == '') {
      setIsLoading(false)
      return Alert.alert('Kesalahan', 'Isi form dengan benar!')
    }
    try {
      console.log(`--- post ${URL}/${API_URL}/auth/signin ---`)
      const res = await axios.post(`${URL}/${API_URL}/auth/signin`, {
        email,
        password
      })
      console.log(res)
      // await AsyncStorage.setItem('user', JSON.stringify(res.data.user));
      setIsLoading(false)
      navigation.navigate('Otp', { from: 'Login', data: res.data.user });
    } catch (error) {
      console.log(error.response || error);
      Alert.alert('Gagal', error.response.data.message)
      setIsLoading(false)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#48C239', padding: 15 }}>
      <View style={{ alignItems: 'center' }}>
        <View style={{ width: '100%', flexDirection: 'row', marginBottom: 15 }}>
          <Image
            style={{ width: 119, height: 193, marginBottom: 15, marginEnd: 15 }}
            source={require('../assets/login.png')}
          />
          <View style={{ width: '40%', justifyContent: 'center' }}>
            <Text style={{ marginBottom: 15, fontSize: 20, color: 'white', fontWeight: 'bold' }}>A T E P A Y</Text>
            <Text style={{ color: '#EFFCED' }}>Aplikasi PPOB Termurah dengan Fitur terlengkap untuk segala keperluan digitalmu</Text>
          </View>
        </View>
        <TextInput
          style={{ width: 300, paddingVertical: 5, paddingHorizontal: 20, borderRadius: 10, marginBottom: 15, backgroundColor: '#34842B', color: 'white', textTransform: 'lowercase' }}
          placeholder='Email'
          placeholderTextColor='#C3EBBE'
          textAlign='center'
          keyboardType='email-address'
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          style={{ width: 300, paddingVertical: 5, paddingHorizontal: 20, borderRadius: 10, marginBottom: 15, backgroundColor: '#34842B', color: 'white' }}
          placeholder='Password'
          placeholderTextColor='#C3EBBE'
          textAlign='center'
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
        />
        <Pressable style={{ width: 300, marginBottom: 15, backgroundColor: 'white', borderRadius: 10, paddingVertical: 10 }} onPress={handleLogin}>
          { isLoading ? <ActivityIndicator size="small" color="#48C239" /> : <Text style={{ fontWeight: 'bold', color: '#006634', textAlign: 'center' }}>Masuk</Text> }
        </Pressable>
      </View>
      <Pressable style={{ width: 300, borderWidth: 2, borderColor: 'white', borderRadius: 10, paddingVertical: 8 }} onPress={() => navigation.navigate('Register')}>
        <Text style={{ fontWeight: 'bold', color: 'white', textAlign: 'center' }}>Daftar</Text>
      </Pressable>
    </SafeAreaView>
  );
}

export default LoginScreen