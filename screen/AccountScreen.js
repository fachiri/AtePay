import * as React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, ActivityIndicator, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { API_URL, URL } from '../env';
import axios from "axios";

const AccountScreen = () => {
  const [isPressed, setIsPressed] = React.useState(0)
  const [user, setUser] = React.useState({})
  const isFocused = useIsFocused();
  const [isScreenLoading, setIsScreenLoading] = React.useState(true);
  const [isEditName, setIsEditName] = React.useState(false);
  const [isEditEmail, setIsEditEmail] = React.useState(false);
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')

  React.useEffect(() => {
    if (isFocused) {
      setIsScreenLoading(true);
      getData();
    }
  }, [isFocused]);
  
  const getData = async () => {
    try {
      const { id } = JSON.parse(await AsyncStorage.getItem('user'));
      const token = await AsyncStorage.getItem('token')
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const user = await axios.get(`${URL}/${API_URL}/user/${id}`, config)
      setUser(user.data.data)
      setName(user.name)
    } catch (error) {
      console.log(error)
    } finally {
      setIsScreenLoading(false);
    }
  }

  const handleChange = async (payload) => {
    try {
      const token = await AsyncStorage.getItem('token')
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      await axios.put(`${URL}/${API_URL}/user/${user.id}`, {
        payload
      }, config)
      Alert.alert('Berhasil', 'Data Berhasil diubah!');
    } catch (error) {
      console.log(error.response || error)
      Alert.alert('Gagal', 'Terjadi Kesalahan!');
    } finally {
      setIsEditName(false)
      setIsEditEmail(false)
      getData();
    }
  }

  if (isScreenLoading) {
    return (
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#48C239" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ flex: 1, alignItems: 'stretch' }}>
          <View style={{ marginHorizontal: 15 }}>
            <View style={styles.card}>
              <Pressable 
                onPressIn={() => { setIsPressed(1) }}
                onPressOut={() => { setIsPressed(0) }}
                style={[
                  styles.pressable,
                  isPressed == 1 && styles.pressableActive,
                ]}
                onPress={() => setIsEditName(!isEditName)}
              >
                <View style={{ flex:1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View style={{ flex:1, flexDirection: 'column' }}>
                    <Text style={{ fontSize: 12, color: '#9e9e9e', marginBottom: 5 }}>Nama Lengkap</Text>
                    { isEditName ?
                      <TextInput
                        style={{ fontSize: 15, borderBottomWidth: 1, borderBottomColor: '#6e6e6e', backgroundColor: '#f7f7f7' }}
                        onChangeText={setName}
                        value={name}
                        autoFocus={isEditName ?? false}
                      />
                      :
                      <Text style={{ fontSize: 15 }}>{user.name}</Text>
                    }
                  </View>
                  { isEditName ? 
                  <Pressable
                    style={{ paddingHorizontal: 10, paddingVertical: 10, backgroundColor: '#48C239', borderRadius: 5, marginLeft: 20 }}
                    onPress={() => handleChange ({name})}
                  >
                      <FontAwesome5 name={'save'} size={20} color='#FFF'/>
                  </Pressable> : '' }
                </View>
              </Pressable>
              <Pressable 
                onPressIn={() => { setIsPressed(2) }}
                onPressOut={() => { setIsPressed(0) }}
                style={[
                  styles.pressable,
                  isPressed == 2 && styles.pressableActive,
                ]}
                onPress={() => setIsEditEmail(!isEditEmail)}
              >
                <View style={{ flex:1, flexDirection: 'column' }}>
                    <Text style={{ fontSize: 12, color: '#9e9e9e', marginBottom: 5 }}>Email</Text>
                    { isEditEmail ?
                      <TextInput
                        style={{ fontSize: 15, borderBottomWidth: 1, borderBottomColor: '#6e6e6e', backgroundColor: '#f7f7f7', textTransform: 'lowercase' }}
                        onChangeText={setEmail}
                        keyboardType='email-address'
                        value={email}
                        autoFocus={isEditEmail ?? false}
                      />
                      :
                      <Text style={{ fontSize: 15 }}>{user.email}</Text>
                    }
                  </View>
                  { isEditEmail ? 
                  <Pressable
                    style={{ paddingHorizontal: 10, paddingVertical: 10, backgroundColor: '#48C239', borderRadius: 5, marginLeft: 20 }}
                    onPress={() => handleChange ({email})}
                  >
                      <FontAwesome5 name={'save'} size={20} color='#FFF'/>
                  </Pressable> : '' }
              </Pressable>
              <Pressable 
                onPressIn={() => { setIsPressed(3) }}
                onPressOut={() => { setIsPressed(0) }}
                style={[
                  styles.pressable,
                  isPressed == 3 && styles.pressableActive,
                ]}
              >
                <View style={{ flexDirection: 'column' }}>
                  <Text style={{ fontSize: 12, color: '#9e9e9e', marginBottom: 5 }}>No. HP</Text>
                  <Text style={{ fontSize: 15 }}>{user.phone}</Text>
                </View>
                <FontAwesome5 name={'chevron-right'} size={20} color='#48C239'/>
              </Pressable>
            </View>
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

export default AccountScreen