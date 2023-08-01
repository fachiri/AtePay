import * as React from 'react';
import { View, Text, TextInput, Pressable, Image, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { API_URL, URL } from '../env';
import axios from "axios";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [repeatPassword, setRepeatPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleRegister = async () => {
    setIsLoading(true)
    if (email == '' || password == '' || name == '' || phone == '' || repeatPassword == '' || password != repeatPassword) {
      setIsLoading(false)
      return Alert.alert('Kesalahan', 'Isi form dengan benar!')
    }
    try {
      const response = await axios.post(`${URL}/${API_URL}/auth/signup`, {
        name,
        email,
        phone: `62${phone}`,
        password
      })
      Alert.alert('Berhasil', response.data.message)
      navigation.navigate('Otp', { from: 'Register', data: response.data.data })
    } catch (error) {
      Alert.alert('Kesalahan', error.response.data.message)
      setIsLoading(false)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#48C239', padding: 15 }}>
      <View style={{ alignItems: 'center' }}>
        <View style={{ width: 300, flexDirection: 'row', marginBottom: 15, justifyContent: 'space-between' }}>
          <View style={{ width: '45%', justifyContent: 'center' }}>
            <Text style={{ marginBottom: 15, fontSize: 20, color: 'white', fontWeight: 'bold' }}>Daftar</Text>
            <Text style={{ color: '#EFFCED' }}>Buat akunmu sekarang juga dan rasakan pengalaman bertransaksi digital yang mudah</Text>
          </View>
          <Image
            style={{ width: 153.86, height: 193, marginBottom: 15 }}
            source={require('../assets/register.png')}
          />
        </View>
        <TextInput
          style={{ width: 300, paddingVertical: 5, paddingHorizontal: 20, borderRadius: 10, marginBottom: 15, backgroundColor: '#34842B', color: 'white' }}
          placeholder='Nama'
          placeholderTextColor='#C3EBBE'
          textAlign='center'
          onChangeText={setName}
          value={name}
        />
        <TextInput
          style={{ width: 300, paddingVertical: 5, paddingHorizontal: 20, borderRadius: 10, marginBottom: 15, backgroundColor: '#34842B', color: 'white', textTransform: 'lowercase' }}
          placeholder='Email'
          placeholderTextColor='#C3EBBE'
          textAlign='center'
          keyboardType='email-address'
          onChangeText={setEmail}
          value={email}
        />
        <View style={{ width: 300, flexDirection: 'row', marginBottom: 15 }}>
          <Text style={{ paddingTop: 8, paddingHorizontal: 20, backgroundColor: '#34842B', color: 'white', borderTopLeftRadius: 10, borderBottomLeftRadius: 10, borderRightWidth: 2, borderRightColor: '#eee' }}>+62</Text>
          <TextInput
            style={{ paddingVertical: 5, paddingHorizontal: 20, backgroundColor: '#34842B', color: 'white', flexGrow: 1, borderTopRightRadius: 10, borderBottomRightRadius: 10 }}
            placeholder='No. HP'
            placeholderTextColor='#C3EBBE'
            textAlign='center'
            onChangeText={setPhone}
            value={phone}
            keyboardType="numeric"
            maxLength={11}
          />
        </View>
        <TextInput
          style={{ width: 300, paddingVertical: 5, paddingHorizontal: 20, borderRadius: 10, marginBottom: 15, backgroundColor: '#34842B', color: 'white' }}
          placeholder='Password'
          placeholderTextColor='#C3EBBE'
          textAlign='center'
          secureTextEntry={true}
          autoComplete='new-password'
          onChangeText={setPassword}
          value={password}
        />
        <TextInput
          style={{ width: 300, paddingVertical: 5, paddingHorizontal: 20, borderRadius: 10, marginBottom: 15, backgroundColor: '#34842B', color: 'white' }}
          placeholder='Ulangi Password'
          placeholderTextColor='#C3EBBE'
          textAlign='center'
          secureTextEntry={true}
          onChangeText={setRepeatPassword}
          value={repeatPassword}
        />
        <Pressable 
          style={{ width: 300, marginBottom: 15, backgroundColor: 'white', borderRadius: 10, paddingVertical: 10 }}
          onPress={handleRegister}
        >
          { isLoading ? <ActivityIndicator size="small" color="#48C239" /> : <Text style={{ fontWeight: 'bold', color: '#006634', textAlign: 'center' }}>Buat Akun</Text> }
        </Pressable>
      </View>
      <Pressable style={{ width: 300, borderWidth: 2, borderColor: 'white', borderRadius: 10, paddingVertical: 8 }} onPress={() => navigation.navigate('Login')}>
        <Text style={{ fontWeight: 'bold', color: 'white', textAlign: 'center' }}>Masuk</Text>
      </Pressable>
    </SafeAreaView>
  );
}

export default RegisterScreen