import * as React from 'react';
import { View, Text, TextInput, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const RegisterScreen = ({ navigation }) => {
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
        />
        <TextInput
          style={{ width: 300, paddingVertical: 5, paddingHorizontal: 20, borderRadius: 10, marginBottom: 15, backgroundColor: '#34842B', color: 'white' }}
          placeholder='Email'
          placeholderTextColor='#C3EBBE'
          textAlign='center'
          keyboardType='email-address'
        />
        <TextInput
          style={{ width: 300, paddingVertical: 5, paddingHorizontal: 20, borderRadius: 10, marginBottom: 15, backgroundColor: '#34842B', color: 'white' }}
          placeholder='Password'
          placeholderTextColor='#C3EBBE'
          textAlign='center'
          secureTextEntry={true}
          autoComplete='new-password'
        />
        <TextInput
          style={{ width: 300, paddingVertical: 5, paddingHorizontal: 20, borderRadius: 10, marginBottom: 15, backgroundColor: '#34842B', color: 'white' }}
          placeholder='Ulangi Password'
          placeholderTextColor='#C3EBBE'
          textAlign='center'
          secureTextEntry={true}
        />
        <Pressable style={{ width: 300, marginBottom: 15, backgroundColor: 'white', borderRadius: 10, paddingVertical: 10 }}>
          <Text style={{ fontWeight: 'bold', color: '#006634', textAlign: 'center' }}>Buat Akun</Text>
        </Pressable>
      </View>
      <Pressable style={{ width: 300, borderWidth: 2, borderColor: 'white', borderRadius: 10, paddingVertical: 8 }} onPress={() => navigation.navigate('Login')}>
        <Text style={{ fontWeight: 'bold', color: 'white', textAlign: 'center' }}>Masuk</Text>
      </Pressable>
    </SafeAreaView>
  );
}

export default RegisterScreen