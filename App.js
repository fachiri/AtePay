import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screen/HomeScreen';
import HistoryScreen from './screen/HistoryScreen'
import LoginScreen from './screen/LoginScreen'
import RegisterScreen from './screen/RegisterScreen'
import ProductScreen from './screen/ProductScreen'
import ProfileScreen from './screen/ProfileScreen'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Beranda" screenOptions={{ headerShown: false }}>
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

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={BottomTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;