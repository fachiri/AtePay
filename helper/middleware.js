import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL, URL } from '@env';

export const checkToken = async () => {
  try {
    console.log('--- checkToken() ---')
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found!')
    }
    await axios.post(`${URL}/${API_URL}/auth/checktoken`, { token })
    return true
  } catch (error) {
    console.log('Error retrieving token from AsyncStorage:', error);
    await AsyncStorage.removeItem('token')
    await AsyncStorage.removeItem('user')
    return false
  }
};