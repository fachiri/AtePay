import * as React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, ActivityIndicator, Alert, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { getIDR } from '../helper/numberFormat'

const PaymentDetailScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { bill } = useRoute().params;

  const handlePayNow = async () => {
    try {
      setIsLoading(true)
      navigation.navigate('Pin', { from: 'PaymentDetail', action: 'handlePayNow', data: bill });
    } catch (error) {
      console.log(error.message)
      Alert.alert('Kesalahan', error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ flex: 1, alignItems: 'stretch' }}>
          <View style={{ marginHorizontal: 15 }}>
            <View style={[styles.card, { marginBottom: 20}]}>
              <View style={{ paddingHorizontal: 20, paddingVertical: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>No. REF</Text>
                <Text>{bill.no_ref}</Text>
              </View>
              <View style={{ paddingHorizontal: 20, paddingVertical: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>Judul</Text>
                <Text>{bill.title}</Text>
              </View>
              <View style={{ paddingHorizontal: 20, paddingVertical: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>Status</Text>
                <Text>{bill.payment.status}</Text>
              </View>
              <View style={{ paddingHorizontal: 20, paddingVertical: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>Metode</Text>
                { bill.payment.sender_bank_type ? 
                  <Text>{bill.payment.sender_bank_type.split('_').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} ({bill.payment.sender_bank.toUpperCase()})</Text>
                  : <Text>-</Text>
                }
              </View>
              
              <View style={{ paddingHorizontal: 20, paddingVertical: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>Tanggal</Text>
                <Text>{bill.createdAt}</Text>
              </View>
              <View style={{ paddingHorizontal: 20, paddingVertical: 20, marginTop: 15, flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 2, borderTopColor: '#eee' }}>
                <Text style={{ fontWeight: '600' }}>Total Bayar</Text>
                <Text style={{ fontWeight: '600' }}>{getIDR(bill.amount)}</Text>
              </View>
            </View>
            <Pressable
              style={[styles.card, { paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#48C239' }]}
              onPress={handlePayNow}
            >
              { isLoading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={{ fontSize: 15, fontWeight: 'bold', textAlign: 'center', color: '#fff' }}>Bayar Sekarang</Text> }
            </Pressable>
            <Text style={{ textAlign: 'center', fontStyle: 'italic', marginTop: 5, fontWeight: '500', paddingHorizontal: 60 }}>Lakukan Pembayaran Sebelum {bill.expired_date}</Text>
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

export default PaymentDetailScreen