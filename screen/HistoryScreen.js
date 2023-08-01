import * as React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, ActivityIndicator, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { API_URL, URL } from '../env';
import { useIsFocused } from '@react-navigation/native';
import { getIDR } from '../helper/numberFormat'

const Amount = ({amount}) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={{ fontSize: 12, color: '#888888' }}>Rp</Text>
      <Text style={{ fontSize: 15, fontWeight: '500' }}>{getIDR(amount).replace(/Rp/g, "")}</Text>
    </View>
  );
}

const HistoryScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [isPressed, setIsPressed] = React.useState(0);
  const [user, setuser] = React.useState({});
  const [token, setToken] = React.useState('');
  const [bills, setBills] = React.useState([]);
  const [isScreenLoading, setIsScreenLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setIsScreenLoading(true);
    getData().finally(() => setRefreshing(false));
  }, []);

  React.useEffect(() => {
    setIsScreenLoading(true);
    if (isFocused) {
      getData();
    }
  }, [isFocused]);

  const getData = async () => {
    try {
      const dataUser = await AsyncStorage.getItem('user');
      const token = await AsyncStorage.getItem('token');
      setuser(JSON.parse(dataUser));
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${URL}/${API_URL}/payment/my-bills?user_id=${JSON.parse(dataUser).id}`, config);
      setBills(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsScreenLoading(false);
    }
  };

  const getPaymentIcon = (status, type) => {
    return status === 'PENDING' ? 'hourglass-half' :
           status === 'FAILED' ? 'times' :
           status === 'SUCCESSFUL' && type === 'DEBIT' ? 'plus-circle' :
           status === 'SUCCESSFUL' && type !== 'DEBIT' ? 'minus' : 'question';
  }

  if (isScreenLoading) {
    return (
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#48C239" />
      </View>
    );
  }

  // Check if bills is an array before mapping
  const renderBills = Array.isArray(bills) && bills.length > 0 ? (
    bills.map((bill, index) => (
      <View key={index} style={styles.card}>
        <Pressable
          // onPressIn={() => { setIsPressed(index + 1); }}
          // onPressOut={() => { setIsPressed(0); }}
          style={[
            styles.pressable,
            isPressed === index + 1 && styles.pressableActive,
          ]}
          onPress={() => navigation.navigate('PaymentDetail', { bill })}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ borderWidth: 1, borderColor: '#48C239', borderRadius: 5, paddingVertical: 4, width: 30 }}>
              <FontAwesome5 name={getPaymentIcon(bill.payment.status, bill.payment.type)} size={18} color='#48C239' style={{ textAlign: 'center' }} />
            </View>
            <View style={{ flexDirection: 'column', marginLeft: 15 }}>
              <Text style={{ fontSize: 12, color: '#9e9e9e' }}>{bill.title}</Text>
              <Text style={{ fontSize: 13 }}>{ bill.payment ? bill.payment.status : bill.status}</Text>
            </View>
          </View>
          <Amount amount={bill.amount} />
        </Pressable>
      </View>
    ))
  ) : (
    <View style={[styles.card, { paddingHorizontal: 20, paddingVertical: 25 }]}>
      <Text style={{ textAlign: 'center' }}>Riwayat tidak ditemukan!</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ flex: 1, alignItems: 'stretch' }}>
          <View style={{ marginHorizontal: 15, marginTop: 15 }}>
            {renderBills}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

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
  },
  pressable: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },
  pressableActive: {
    backgroundColor: '#00000010',
  },
});

export default HistoryScreen;
