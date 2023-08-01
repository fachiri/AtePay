import * as React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, RefreshControl, ActivityIndicator, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { API_URL, URL, REDIRECT_URL } from '../env';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const ProductScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [isPressed, setIsPressed] = React.useState(0);
  const [user, setuser] = React.useState({});
  const [token, setToken] = React.useState('');
  const [products, setProducts] = React.useState([]);
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
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${URL}/${API_URL}/products`, config);
      setProducts(response.data.data)
    } catch (error) {
      console.log(error);
    } finally {
      setIsScreenLoading(false);
    }
  };

  if (isScreenLoading) {
    return (
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#48C239" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ flex: 1, alignItems: 'center', padding: 15 }}>
          {products.length > 0 ? products.map((product, index) => (
            product.brands.length > 0 ?
              <View key={index} style={styles.card}>
                <Text style={{ fontWeight: 'bold', marginBottom: 20, fontSize: 15 }}>{product.category}</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  {product.brands.map((brand, brandIndex) => (
                    <Pressable
                      key={brandIndex}
                      onPress={() => navigation.navigate('ProductDetail', { brand, categoryId: product.id })}
                      style={{ alignItems: 'center', marginBottom: 20, width: '25%' }}
                    >
                      <Image
                        style={{ width: 30, height: 30, marginBottom: 10 }}
                        source={require('../assets/products/dana.png')}
                      />
                      <Text style={{ fontWeight: 'semibold', textAlign: 'center', fontSize: 13 }} numberOfLines={2}>{brand}</Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            : ''
          )) : (
            <View style={[styles.card, { paddingHorizontal: 20, paddingVertical: 25 }]}>
              <Text style={{ textAlign: 'center' }}>Produk tidak ditemukan!</Text>
            </View>
          )}
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
    marginBottom: 20
  },
});

export default ProductScreen