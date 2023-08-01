import { useEffect, useState } from 'react';
import { Text, Pressable, ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screen/HomeScreen';
import HistoryScreen from './screen/HistoryScreen'
import LoginScreen from './screen/LoginScreen'
import RegisterScreen from './screen/RegisterScreen'
import OtpScreen from './screen/OtpScreen'
import PinScreen from './screen/PinScreen'
import ProductScreen from './screen/ProductScreen'
import ProfileScreen from './screen/ProfileScreen'
import AccountScreen from './screen/AccountScreen'
import SecurityScreen from './screen/SecurityScreen'
import TopupScreen from './screen/TopupScreen'
import BrowserViewScreen from './screen/BrowserViewScreen'
import PaymentDetailScreen from './screen/PaymentDetailScreen'
import SplashScreen from './screen/SplashScreen'
import ResetPinScreen from './screen/ResetPinScreen'
import NotificationScreen from './screen/NotificationScreen'
import NotificationDetailScreen from './screen/NotificationDetailScreen'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { checkToken } from './helper/middleware'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const headerOption = (title) => {
  return {
    headerTitle: (props) => (
      <Text
        {...props}
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: '#FFFFFF'
        }}
      >
        {title}
      </Text>
    ),
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#48C239',
    },
    headerTitleAlign: 'center'
  }
}

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator 
      initialRouteName="Beranda" 
      screenOptions={{ 
        headerShown: false,
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#91eb81',
        tabBarStyle: { backgroundColor: '#48C239', paddingTop: 5, height: 60 },
        tabBarLabelStyle: { marginBottom: 5 },
      }}
    >
      <Tab.Screen 
        name="Beranda" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name={'home'} color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name="Riwayat"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name={'history'} color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name="Produk"
        component={ProductScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name={'shopping-cart'} color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name="Profil"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name={'user-circle'} color={color} size={size} />
          )
        }}
      />
    </Tab.Navigator>
  );
}

const App = ({ navigation }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const getUserToken = async () => {
    setIsLoading(true);
    checkToken()
      .then((isTokenValid) => {
        setIsLogin(isTokenValid);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getUserToken();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLogin ? "Main" : "Login"}>
        <Stack.Screen name="Main" component={BottomTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Account" component={AccountScreen} options={headerOption('Informasi Akun')} />
        <Stack.Screen name="Security" component={SecurityScreen} options={headerOption('Keamanan')} />
        <Stack.Screen name="Topup" component={TopupScreen} options={headerOption('Topup')} />
        <Stack.Screen name="PaymentDetail" component={PaymentDetailScreen} options={headerOption('Detail Pembayaran')} />
        <Stack.Screen name="BrowserView" component={BrowserViewScreen} options={headerOption('Browser')} />
        <Stack.Screen name="Notification" component={NotificationScreen} options={headerOption('Notifikasi')} />
        <Stack.Screen name="NotificationDetail" component={NotificationDetailScreen} options={headerOption('Detail Notifikasi')} />

        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Otp" component={OtpScreen} options={{ headerShown: false }} navigation={navigation} />
        <Stack.Screen name="Pin" component={PinScreen} options={headerOption('Pin Transaksi')} />
        <Stack.Screen name="ResetPin" component={ResetPinScreen} options={headerOption('Pin Transaksi')} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;