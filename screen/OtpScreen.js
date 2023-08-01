import * as React from 'react';
import { View, Text, TextInput, Pressable, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL, URL } from '@env';
import { useRoute } from '@react-navigation/native';

const OtpScreen = ({ navigation }) => {
  const [otp, setOtp] = React.useState('');
  const [user, setuser] = React.useState({})
  const [disabled, setDisabled] = React.useState(false)
  const [countdown, setCountdown] = React.useState(30)
  const [isLoading, setIsLoading] = React.useState(false);
  const [contact, setContact] = React.useState('');
  const { from, data } = useRoute().params;

  React.useEffect(() => {
    getData()
    let timer = null;
    if (disabled) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000); // setiap 1 detik

      if (countdown <= 0) {
        setDisabled(false);
        clearInterval(timer);
      }
    }

    return () => clearInterval(timer);
  }, [disabled, countdown]);

  const getData = async () => {
    const dataUser = await AsyncStorage.getItem('user');
    setuser(JSON.parse(dataUser))
  }

  const sendOtp = async (type) => {
    if (!disabled) {
      let userContact = `+${data.phone}`
      if (type == 'EMAIL') {
        userContact = data.email
      }
      setDisabled(true);
      await axios.post(`${URL}/${API_URL}/auth/sendotp`, {
        id: data.id,
        type
      })
        .then((res) => {
          setContact(`Kode OTP telah dikirim ke ${type} ${userContact}`)
          setCountdown(30);
        })
        .catch((error) => {
          console.log(error)
          Alert.alert('Terjadi Kesalahan', error.response.data.message)
        })
    }
  }

  const handleVerifyOtp = async () => {
    setIsLoading(true)
    if (otp.length !== 6) {
      setIsLoading(false)
      return Alert.alert('Kesalahan', 'Isi OTP dengan benar!');
    }
    try {
      const verifyToken = await axios.post(`${URL}/${API_URL}/auth/verifytoken`, {
        id: data.id,
        code: otp
      })
      const config = {
        headers: {
          Authorization: `Bearer ${verifyToken.data.token}`,
        },
      }
      if(from == 'Register') {
        await axios.put(`${URL}/${API_URL}/user/${data.id}`, {
          payload: {
            status: 'ACTIVE'
          }
        }, config)
        Alert.alert('Berhasil', 'Akun telah aktif!');
        navigation.navigate('Login');
      } else {
        // cek pin
        const userData = await axios.get(`${URL}/${API_URL}/user/${data.id}`, config)
        if(!userData.data.data.pin) {
          return navigation.navigate('ResetPin', { from: 'Register', data: { user: data, token: verifyToken.data.token } })
        }
        await AsyncStorage.setItem('user', JSON.stringify(data));
        await AsyncStorage.setItem('token', verifyToken.data.token);
        Alert.alert('Berhasil', verifyToken.data.message);
        navigation.navigate('Main');
      }
    } catch (error) {
      Alert.alert('Gagal', error.message);
    } finally {
      setIsLoading(false)
    }
  };

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    if (value && index < 5) {
      // Pindahkan kursor ke input berikutnya saat diisi
      inputRefs[index + 1].focus();
    } else if (!value && index > 0) {
      // Kembali ke input sebelumnya saat dihapus
      inputRefs[index - 1].focus();
    }

    setOtp(newOtp.join(''));
  };

  const inputRefs = [];

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: '#48C239', padding: 15 }}>
      <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold', marginBottom: 30 }}>Kode Verifikasi</Text>
      { disabled ? <Text style={{ color: 'white', textAlign: 'center', marginBottom: 30 }}>{contact}</Text> : '' }
      <View style={{ flexDirection: 'row', marginBottom: 30 }}>
        {[...Array(6)].map((_, index) => (
          <TextInput
            key={index}
            style={{ width: 40, height: 40, marginHorizontal: 5, borderRadius: 10, textAlign: 'center', backgroundColor: '#34842B', color: 'white' }}
            maxLength={1}
            keyboardType="numeric"
            onChangeText={(value) => handleOtpChange(value, index)}
            ref={(inputRef) => (inputRefs[index] = inputRef)}
            autoFocus={index == 0 ? true : false}
          />
        ))}
      </View>
      <Pressable 
        style={{ width: 300, marginBottom: 15, borderRadius: 10, paddingVertical: 10, borderWidth: 2, borderColor: 'white', opacity: disabled ? 0.5 : 1 }}
        disabled={disabled}
        onPress={() => sendOtp('SMS')}
      >
        <Text style={{ fontWeight: 'bold', color: 'white', textAlign: 'center' }}>{ disabled ? countdown : 'Kirim OTP via SMS' }</Text>
      </Pressable>
      <Pressable 
        style={{ width: 300, marginBottom: 15, borderRadius: 10, paddingVertical: 10, borderWidth: 2, borderColor: 'white', opacity: disabled ? 0.5 : 1 }}
        disabled={disabled}
        onPress={() => sendOtp('WHATSAPP')}
      >
        <Text style={{ fontWeight: 'bold', color: 'white', textAlign: 'center' }}>{ disabled ? countdown : 'Kirim OTP via WHATSAPP' }</Text>
      </Pressable>
      <Pressable 
        style={{ width: 300, marginBottom: 15, borderRadius: 10, paddingVertical: 10, borderWidth: 2, borderColor: 'white', opacity: disabled ? 0.5 : 1 }}
        disabled={disabled}
        onPress={() => sendOtp('EMAIL')}
      >
        <Text style={{ fontWeight: 'bold', color: 'white', textAlign: 'center' }}>{ disabled ? countdown : 'Kirim OTP via EMAIL' }</Text>
      </Pressable>
      <Pressable 
        style={{ width: 300, marginBottom: 15, backgroundColor: 'white', borderRadius: 10, paddingVertical: 10 }}
        onPress={() => handleVerifyOtp()}
      >
        { isLoading ? <ActivityIndicator size="small" color="#48C239" /> : <Text style={{ fontWeight: 'bold', color: '#006634', textAlign: 'center' }}>Verifikasi</Text> }
      </Pressable>
    </SafeAreaView>
  );
}

export default OtpScreen