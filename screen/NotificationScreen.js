import * as React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, ActivityIndicator, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { API_URL, URL } from '@env';
import { useIsFocused } from '@react-navigation/native';
import { getDate } from '../helper/dateFormat'

const NotificationScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [isPressed, setIsPressed] = React.useState(0);
  const [user, setuser] = React.useState({});
  const [token, setToken] = React.useState('');
  const [notifs, setNotifs] = React.useState([]);
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
      setToken(token)
      // setuser()
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${URL}/${API_URL}/notification/${JSON.parse(dataUser).id}`, config);
      setNotifs(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsScreenLoading(false);
    }
  };

  const handleRead = async (notif) => {
    if(notif.isRead == 0) {
      // kalo belum dibaca
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.put(`${URL}/${API_URL}/notification/${notif.id}`, { payload: { isRead: 1 } } ,config)
      notif.isRead == 1
    }
    navigation.navigate('NotificationDetail', { notif })
  }

  if (isScreenLoading) {
    return (
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#48C239" />
      </View>
    );
  }

  // Check if bills is an array before mapping
  const renderNotifs = Array.isArray(notifs) && notifs.length > 0 ? (
    notifs.map((notif, index) => (
      <View key={index} style={styles.card}>
        <Pressable
          style={{ paddingHorizontal: 20, paddingVertical: 15, flexDirection: 'row' }}
          onPress={() => handleRead(notif)}
        >
          <FontAwesome5 name={notif.isRead == 1 ? 'envelope-open' : 'envelope'} size={25} color='#48C239'/>
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={{ fontWeight: '700', marginBottom: 3 }}>{notif.title}</Text>
            <Text style={{ marginBottom: 3 }} numberOfLines={2} ellipsizeMode="tail">{notif.body}</Text>
            <Text style={{ color: '#858585', fontSize: 12 }}>
              {getDate(notif.createdAt)}
            </Text>
          </View>
        </Pressable>
      </View>
    ))
  ) : (
    <View style={[styles.card, { paddingHorizontal: 20, paddingVertical: 15 }]}>
      <Text style={{ textAlign: 'center' }}>Notifikasi tidak ditemukan!</Text>
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
          <View style={{ marginHorizontal: 15 }}>
            {renderNotifs}
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
  }
});

export default NotificationScreen;
