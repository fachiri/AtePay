import * as React from 'react';
import { View, Text, TextInput, Pressable, Alert, ActivityIndicator, Modal, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL, URL } from '../env';
import { useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const OtpScreen = ({ navigation }) => {
  const [otp, setOtp] = React.useState('');
  const [loadingModal, setLoadingModal] = React.useState(false);
  const { from, data } = useRoute().params;

  const handleSendOtp = async (type) => {
    try {
      console.log('--- handleSendOtp()')
      setLoadingModal(true)
      let userContact = `+${data.phone}`
      if (type == 'EMAIL') {
        userContact = data.email
      }
      await axios.post(`${URL}/${API_URL}/auth/sendotp`, {
        id: data.id,
        type
      })
      Alert.alert('Sukses', `Kode OTP telah dikirim ke ${type} ${userContact}`)
    } catch (error) {
      console.log('--- Error handleSendOtp()', error)
      Alert.alert('Gagal', error.response?.data?.message || error.message)
    } finally {
      setLoadingModal(false)
    }
  }

  const handleVerifyOtp = async () => {
    try {
      setLoadingModal(true)
      if (otp.length !== 6) {
        setLoadingModal(false)
        throw ({message: 'Isi OTP dengan benar!'});
      }
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
      console.log('--- Error handleVerifyOtp()', error)
      Alert.alert('Gagal', error.response?.data?.message || error.message)
    } finally {
      setLoadingModal(false)
    }
  };

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    if (value && index < 5) {
      inputRefs[index + 1].focus();
    } else if (!value && index > 0) {
      inputRefs[index - 1].focus();
    }
    setOtp(newOtp.join(''));
  };

  const inputRefs = [];

  const otpProviders = [
    { label: 'Kirim OTP', value: '' },
    { label: 'Email', value: 'EMAIL' },
    { label: 'SMS', value: 'SMS' },
    { label: 'Whatsapp', value: 'WHATSAPP' }
  ]

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: '#48C239', padding: 15 }}>
      <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold', marginBottom: 30 }}>Kode Verifikasi</Text>
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
      
        <View style={{ width: 300, marginBottom: 15, borderRadius: 10, backgroundColor: 'white' }}>
          <Picker
            onValueChange={(itemValue) => handleSendOtp(itemValue)}
          >
            {otpProviders.map((otpProvider, index) => (
              <Picker.Item key={index} label={otpProvider.label} value={otpProvider.value} style={{ fontSize: 13 }} />
            ))}
          </Picker>
        </View>
      <Pressable 
        style={{ width: 300, marginBottom: 15, backgroundColor: 'white', borderRadius: 10, paddingVertical: 13 }}
        onPress={() => handleVerifyOtp()}
      >
        <Text style={{ fontWeight: 'bold', color: '#006634', textAlign: 'center', fontSize: 14 }}>Verifikasi</Text>
      </Pressable>

      {/* Modal untuk menampilkan loading indicator */}
      <Modal visible={loadingModal} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <ActivityIndicator size="large" color="#ffffff" />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    backgroundColor: '#48C239',
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#ffffff',
    marginTop: 10,
  },
});

export default OtpScreen