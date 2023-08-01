import * as React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, ActivityIndicator, Alert, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { API_URL, URL, REDIRECT_URL } from '@env';
import { getDateTimeOneDayAhead } from '../helper/dateFormat'
import axios from "axios";
import { useRoute } from '@react-navigation/native';
import { getFullDate } from '../helper/dateFormat'

const NotificationDetailScreen = ({ navigation }) => {
  const { notif } = useRoute().params;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ flex: 1, alignItems: 'stretch' }}>
          <View style={{ marginHorizontal: 15 }}>
            <View style={[styles.card, { paddingHorizontal: 20, paddingVertical: 15 }]}>
              <FontAwesome5 name={notif.isRead == 1 ? 'envelope-open' : 'envelope'} size={30} color='#48C239' style={{ marginBottom: 15 }} />
              <Text style={{ color: '#6b6b6b', marginBottom: 5 }}>{notif.type}</Text>
              <Text style={{ color: '#6b6b6b', borderBottomWidth: 1, borderBottomColor: '#9e9e9e', marginBottom: 15, paddingBottom: 15 }}>{getFullDate(notif.createdAt)}</Text>
              <Text style={{ fontWeight: '700', marginBottom: 5 }}>{notif.title}</Text>
              <Text style={{ marginBottom: 5 }}>{notif.body}</Text>
            </View>
            {/* <Pressable
              style={[styles.card, { paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#48C239' }]}
              onPress={handlePayNow}
            >
              { isLoading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={{ fontSize: 15, fontWeight: 'bold', textAlign: 'center', color: '#fff' }}>Bayar Sekarang</Text> }
            </Pressable>
            <Text style={{ textAlign: 'center', fontStyle: 'italic', marginTop: 5, fontWeight: '500', paddingHorizontal: 60 }}>Lakukan Pembayaran Sebelum {bill.expired_date}</Text> */}
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

export default NotificationDetailScreen