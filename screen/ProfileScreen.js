import * as React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ImageBackground, Pressable, Alert, ActivityIndicator, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { API_URL, URL } from '../env';
import axios from "axios";
import * as ImagePicker from 'expo-image-picker';

const HomeScreen = ({ navigation }) => {
  const [isPressed, setIsPressed] = React.useState(0)
  const [user, setUser] = React.useState({})
  const [token, setToken] = React.useState('')
  const isFocused = useIsFocused();
  const [isScreenLoading, setIsScreenLoading] = React.useState(true);
  const [image, setImage] = React.useState(null);

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
      setToken(token)
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const user = await axios.get(`${URL}/${API_URL}/user/${id}`, config)
      setUser(user.data.data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsScreenLoading(false);
    }
  }

  const handleSignOut = () => {
    Alert.alert(
      'Keluar',
      'Apakah Anda yakin ingin melanjutkan?',
      [
        {
          text: 'Batal',
          style: 'cancel',
        },
        {
          text: 'Ya, Keluar',
          onPress: async () => {
            await AsyncStorage.removeItem('token')
            await AsyncStorage.removeItem('user')
            navigation.navigate('Login');
          },
        },
      ]
    )
  }

  const pickImage = async () => {
    try {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      
      if (!result.canceled) {
        const { id } = JSON.parse(await AsyncStorage.getItem('user'));
        setIsScreenLoading(true);
        setImage(result.assets[0].uri);
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        };
        const formData = new FormData();
        const photoName = result.assets[0].uri.split('/').pop().split('.')[0];
        const extension = result.assets[0].uri.split('.').pop();
        formData.append('profilePicture', {
          uri: result.assets[0].uri,
          type: `image/${extension}`,
          name: `${photoName}.${extension}`,
        });
        await axios.post(`${URL}/${API_URL}/user/change-profile-picture/${id}`, formData, config)
        await getData()
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsScreenLoading(false);
    }
  };  

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
          <View style={{ width: '100%', paddingBottom: 15, backgroundColor: '#48C239', paddingTop: 30 }}>
            <Text style={{ fontSize: 20, fontWeight: '700', textAlign: 'center', color: 'white' }}>PROFIL</Text>
          </View>
          <ImageBackground 
            style={{ flex: 1, alignItems: 'center', paddingHorizontal: 15, paddingBottom: 5}}
            source={require('../assets/bg1.png')}
          >
            <View style={[styles.card, { flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: 0}]}>
              <View style={{ marginBottom: 15, width: 80, height: 80, borderRadius: 40, overflow: 'hidden', backgroundColor: '#FFF' }}>
                <Pressable onPress={pickImage}>
                  <Image
                    style={{ width: '100%', height: '100%' }}
                    source={{ uri: user.avatar ? `${URL}/uploads/profiles/${user.avatar}` : `${URL}/uploads/profiles/profile-default.png` }}
                  />
                </Pressable>
              </View>
              <Text style={{ fontSize: 20, fontWeight: '500' }}>{user.name}</Text>
              <Text style={{ fontSize: 12, fontWeight: '500', color: '#888888' }}>{user.email}</Text>
            </View>
          </ImageBackground>
          <View style={{ marginHorizontal: 15, marginTop: 10 }}>
            <View style={[styles.card, { padding: 0 }]}>
              <Pressable 
                onPressIn={() => { setIsPressed(1) }}
                onPressOut={() => { setIsPressed(0) }}
                onPress={() => { navigation.navigate('Account') }}
                style={[
                  styles.pressable,
                  isPressed == 1 && styles.pressableActive,
                ]}
              >
                <Text style={{ fontSize: 15 }}>Informasi Akun</Text>
                <FontAwesome5 name={'chevron-right'} size={20} color='#48C239'/>
              </Pressable>
            </View>
            <View style={[styles.card, { padding: 0 }]}>
              <Pressable 
                onPressIn={() => { setIsPressed(2) }}
                onPressOut={() => { setIsPressed(0) }}
                onPress={() => { navigation.navigate('Security') }}
                style={[
                  styles.pressable,
                  isPressed == 2 && styles.pressableActive,
                ]}
              >
                <Text style={{ fontSize: 15 }}>Keamanan</Text>
                <FontAwesome5 name={'chevron-right'} size={20} color='#48C239'/>
              </Pressable>
            </View>
            <View style={[styles.card, { padding: 0 }]}>
              <Pressable 
                onPressIn={() => { setIsPressed(3) }}
                onPressOut={() => { setIsPressed(0) }}
                onPress={handleSignOut}
                style={[
                  styles.pressable,
                  isPressed == 3 && styles.pressableActive,
                ]}
              >
                <Text style={{ fontSize: 15 }}>Keluar</Text>
                <FontAwesome5 name={'sign-out-alt'} size={20} color='#48C239'/>
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
    padding: 20,
    marginBottom: 10
  },
  pressable: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  pressableActive: {
    backgroundColor: '#00000010',
    borderRadius: 10,
  },
});

export default HomeScreen