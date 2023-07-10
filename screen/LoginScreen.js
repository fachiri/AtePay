import * as React from 'react';
import { View, Text, TextInput, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const handleLogin = () => {
    if (email == '' || password == '') {
      return console.log('Email atau Password harus diisi!')
    }
    console.log('test')
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
          style={{ width: 300, paddingVertical: 5, paddingHorizontal: 20, borderRadius: 10, marginBottom: 15, backgroundColor: '#34842B', color: 'white' }}
          placeholder='Email/No. HP'
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
          <Text style={{ fontWeight: 'bold', color: '#006634', textAlign: 'center' }}>Masuk</Text>
        </Pressable>
      </View>
      <Pressable style={{ width: 300, borderWidth: 2, borderColor: 'white', borderRadius: 10, paddingVertical: 8 }} onPress={() => navigation.navigate('Register')}>
        <Text style={{ fontWeight: 'bold', color: 'white', textAlign: 'center' }}>Daftar</Text>
      </Pressable>
    </SafeAreaView>
  );
}

export default LoginScreen