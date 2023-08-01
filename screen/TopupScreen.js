import * as React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, ActivityIndicator, Alert, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { API_URL, URL, REDIRECT_URL } from '../env';
import { getDateTimeOneDayAhead } from '../helper/dateFormat'
import axios from "axios";

const TopupScreen = ({ navigation }) => {
  const [isPressed, setIsPressed] = React.useState(0)
  const [user, setuser] = React.useState({})
  const [selectedPrice, setSelectedPrice] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    getData()
  }, []);
  
  const getData = async () => {
    const dataUser = await AsyncStorage.getItem('user');
    setuser(JSON.parse(dataUser))
  }

  const prices = [
    { label: 'Pilih Harga', value: '' },
    { label: 'Rp. 10.000', value: '10000' },
    { label: 'Rp. 25.000', value: '25000' },
    { label: 'Rp. 50.000', value: '50000' },
    { label: 'Rp. 100.000', value: '100000' },
    { label: 'Rp. 500.000', value: '500000' },
  ];  

  const handleTopup = async () => {
    try {
      setIsLoading(true)
      if (selectedPrice == '') {
        setIsLoading(false)
        return Alert.alert('Kesalahan', 'Pilih Harga!')
      }
      const token = await AsyncStorage.getItem('token')
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const response = await axios.post(`${URL}/${API_URL}/payment/create-bill`, {
        user_id: user.id,
        payload: {
          title: "Isi Saldo Atepay",
          amount: selectedPrice,
          type: "SINGLE",
          expired_date: getDateTimeOneDayAhead(),
          redirect_url: `${URL}/${REDIRECT_URL}`,
          is_address_required: 0,
          is_phone_number_required: 0
        }
      }, config)
      const bill = await axios.get(`${URL}/${API_URL}/payment/my-bill?user_id=${user.id}&bill_id=${response.data.id}`, config);
      navigation.navigate('PaymentDetail', { bill: bill.data })
      setIsLoading(false)
    } catch (error) {
      console.log(error.response || error);
      setIsLoading(false)
      Alert.alert('Kesalahan', error.response.data.errors[0].message)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ flex: 1, alignItems: 'stretch' }}>
          <View style={{ marginHorizontal: 15 }}>
            <View style={[styles.card, { marginBottom: 20}]}>
              <Picker
                selectedValue={selectedPrice}
                onValueChange={(itemValue, itemIndex) => setSelectedPrice(itemValue)}
              >
                {prices.map((price, index) => (
                  <Picker.Item key={index} label={price.label} value={price.value} style={{ fontSize: 15 }} />
                ))}
              </Picker>
            </View>
            <Pressable
              style={[styles.card, { paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#48C239' }]}
              onPress={handleTopup}
            >
              { isLoading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={{ fontSize: 15, fontWeight: 'bold', textAlign: 'center', color: '#fff' }}>Lanjut</Text> }
            </Pressable>
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
    marginBottom: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#eeeeee'
  },
  pressable: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee'
  },
  pressableActive: {
    backgroundColor: '#00000010',
  },
});

export default TopupScreen