import * as React from 'react';
import { View, Text, TextInput, Alert, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useRoute } from '@react-navigation/native';
import { API_URL, URL } from '../env';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ResetScreen = ({ navigation }) => {
  const [pin, setPin] = React.useState('');
  const [pin2, setPin2] = React.useState('');
  const [isRepeatPin, setIsRepeatPin] = React.useState(false);
  const [showPin, setShowPin] = React.useState(true);
  const { from, data } = useRoute().params;

  console.log(useRoute().params)

  const handleVerifyPin = async () => {
    if (pin.length === 6) {
      if(isRepeatPin) {
        if(pin == pin2) {
          const config = {
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
          }
          await axios.put(`${URL}/${API_URL}/user/${data.user.id}`, {
            payload: {
              pin
            }
          }, config)
          if(from == 'Register') {
            await AsyncStorage.setItem('user', JSON.stringify(data.user));
            await AsyncStorage.setItem('token', data.token);
            navigation.navigate('Main')
          }
          return Alert.alert('Sukses', 'Pin Berhasil Dibuat!');
        }
        setIsRepeatPin(false)
        setPin2('')
        setPin('')
        return Alert.alert('Gagal', 'Pin Tidak Cocok');
      }
      setIsRepeatPin(true)
      setPin2(pin)
      setPin('')
    } else {
      Alert.alert('Gagal', 'Invalid PIN!');
    }
  };

  React.useEffect(() => {
    if (pin.length === 6) {
      handleVerifyPin();
    }
  }, [pin]);

  const toggleShowPin = () => {
    setShowPin(!showPin);
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', padding: 15 }}>
      <Text style={{ fontSize: 18, fontWeight: '500', marginBottom: 40 }}>{isRepeatPin ? 'Ulangin PIN' : 'Masukkan PIN Baru'}</Text>
      <View style={{ marginBottom: 30 }}>
        <TextInput
          style={styles.pinInput}
          keyboardType="numeric"
          maxLength={6}
          value={pin}
          onChangeText={setPin}
          secureTextEntry={showPin}
          autoFocus
        />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: 300 }}>
        <Pressable onPress={toggleShowPin}>
          {showPin ? <FontAwesome5 name={'eye-slash'} color='#006400' size={20} /> : <FontAwesome5 name={'eye'} color='#006400' size={20} />}
        </Pressable>
        {/* <Pressable>
          <Text style={{ fontWeight: '500', color: '#006400' }}>Lupa PIN ATEPAY?</Text>
        </Pressable> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pinInput: {
    fontSize: 30,
    textAlign: 'center',
    width: 300,
    marginBottom: 15,
    paddingVertical: 5,
    borderBottomWidth: 2
  },
});

export default ResetScreen