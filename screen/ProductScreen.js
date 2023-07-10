import * as React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ flex: 1, alignItems: 'center', padding: 15 }}>
        <View style={styles.card}>
            <Text style={{ fontWeight: 'bold', marginBottom: 20 }}>HARIAN</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ alignItems: 'center', marginRight: 20, width: '20%' }}>
                <Image
                  style={{ width: 30, height: 30, marginBottom: 15 }}
                  source={require('../assets/products/pulsa.png')}
                />
                <Text style={{ fontWeight: 'semibold', textAlign: 'center' }}>Pulsa</Text>
              </View>
              <View style={{ alignItems: 'center', marginRight: 20, width: '20%' }}>
                <Image
                  style={{ width: 30, height: 30, marginBottom: 15 }}
                  source={require('../assets/products/pulsadata.png')}
                />
                <Text style={{ fontWeight: 'semibold', textAlign: 'center' }}>Data</Text>
              </View>
              <View style={{ alignItems: 'center', marginRight: 20, width: '20%' }}>
                <Image
                  style={{ width: 30, height: 30, marginBottom: 15 }}
                  source={require('../assets/products/listrik.png')}
                />
                <Text style={{ fontWeight: 'semibold', textAlign: 'center' }}>Listrik</Text>
              </View>
              <View style={{ alignItems: 'center', marginRight: 20, width: '20%' }}>
                <Image
                  style={{ width: 30, height: 30, marginBottom: 15 }}
                  source={require('../assets/products/dompetdigital.png')}
                />
                <Text style={{ fontWeight: 'semibold', textAlign: 'center' }}>Dompet</Text>
              </View>
            </View>
          </View>
          <View style={styles.card}>
            <Text style={{ fontWeight: 'bold', marginBottom: 20 }}>E-MONEY</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ alignItems: 'center', marginRight: 20, width: '20%' }}>
                <Image
                  style={{ width: 30, height: 30, marginBottom: 15 }}
                  source={require('../assets/products/dana.png')}
                />
                <Text style={{ fontWeight: 'semibold', textAlign: 'center' }}>Dana</Text>
              </View>
              <View style={{ alignItems: 'center', marginRight: 20, width: '20%' }}>
                <Image
                  style={{ width: 30, height: 30, marginBottom: 15 }}
                  source={require('../assets/products/linkaja.png')}
                />
                <Text style={{ fontWeight: 'semibold', textAlign: 'center' }}>Link Aja</Text>
              </View>
              <View style={{ alignItems: 'center', marginRight: 20, width: '20%' }}>
                <Image
                  style={{ width: 30, height: 30, marginBottom: 15 }}
                  source={require('../assets/products/ovo.png')}
                />
                <Text style={{ fontWeight: 'semibold', textAlign: 'center' }}>OVO</Text>
              </View>
              <View style={{ alignItems: 'center', marginRight: 20, width: '20%' }}>
                <Image
                  style={{ width: 30, height: 30, marginBottom: 15 }}
                  source={require('../assets/products/more.png')}
                />
                <Text style={{ fontWeight: 'semibold', textAlign: 'center' }}>Lainnya</Text>
              </View>
            </View>
          </View>
          <View style={styles.card}>
            <Text style={{ fontWeight: 'bold', marginBottom: 20 }}>VOUCHER</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ alignItems: 'center', marginRight: 20, width: '20%' }}>
                <Image
                  style={{ width: 30, height: 30, marginBottom: 15 }}
                  source={require('../assets/products/dana.png')}
                />
                <Text style={{ fontWeight: 'semibold', textAlign: 'center' }}>Wifi ID</Text>
              </View>
              <View style={{ alignItems: 'center', marginRight: 20, width: '20%' }}>
                <Image
                  style={{ width: 30, height: 30, marginBottom: 15 }}
                  source={require('../assets/products/spotify.png')}
                />
                <Text style={{ fontWeight: 'semibold', textAlign: 'center' }}>Spotify</Text>
              </View>
              <View style={{ alignItems: 'center', marginRight: 20, width: '20%' }}>
                <Image
                  style={{ width: 30, height: 30, marginBottom: 15 }}
                  source={require('../assets/products/playstore.png')}
                />
                <Text style={{ fontWeight: 'semibold', textAlign: 'center' }}>Google Play</Text>
              </View>
              <View style={{ alignItems: 'center', marginRight: 20, width: '20%' }}>
                <Image
                  style={{ width: 30, height: 30, marginBottom: 15 }}
                  source={require('../assets/products/more.png')}
                />
                <Text style={{ fontWeight: 'semibold', textAlign: 'center' }}>Lainnya</Text>
              </View>
            </View>
          </View>
          <View style={styles.card}>
            <Text style={{ fontWeight: 'bold', marginBottom: 20 }}>GAMES</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
              <View style={{ alignItems: 'center', marginRight: 20, width: '20%' }}>
                <Image
                  style={{ width: 30, height: 30, marginBottom: 15 }}
                  source={require('../assets/products/freefire.png')}
                />
                <Text style={{ fontWeight: 'semibold', textAlign: 'center' }}>Free Fire</Text>
              </View>
              <View style={{ alignItems: 'center', marginRight: 20, width: '20%' }}>
                <Image
                  style={{ width: 30, height: 30, marginBottom: 15 }}
                  source={require('../assets/products/mlbb.png')}
                />
                <Text style={{ fontWeight: 'semibold', textAlign: 'center' }}>Mobile Legends</Text>
              </View>
              <View style={{ alignItems: 'center', marginRight: 20, width: '20%' }}>
                <Image
                  style={{ width: 30, height: 30, marginBottom: 15 }}
                  source={require('../assets/products/pubg.png')}
                />
                <Text style={{ fontWeight: 'semibold', textAlign: 'center' }}>PUBGM</Text>
              </View>
              <View style={{ alignItems: 'center', marginRight: 20, width: '20%' }}>
                <Image
                  style={{ width: 30, height: 30, marginBottom: 15 }}
                  source={require('../assets/products/aov.png')}
                />
                <Text style={{ fontWeight: 'semibold', textAlign: 'center' }}>Arena of Valor</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
              <View style={{ alignItems: 'center', marginRight: 20, width: '20%' }}>
                <Image
                  style={{ width: 30, height: 30, marginBottom: 15 }}
                  source={require('../assets/products/mlbb.png')}
                />
                <Text style={{ fontWeight: 'semibold', textAlign: 'center' }}>Lord Mobile</Text>
              </View>
              <View style={{ alignItems: 'center', marginRight: 20, width: '20%' }}>
                <Image
                  style={{ width: 30, height: 30, marginBottom: 15 }}
                  source={require('../assets/products/pb.png')}
                />
                <Text style={{ fontWeight: 'semibold', textAlign: 'center' }}>Point Blank</Text>
              </View>
              <View style={{ alignItems: 'center', marginRight: 20, width: '20%' }}>
                <Image
                  style={{ width: 30, height: 30, marginBottom: 15 }}
                  source={require('../assets/products/cod.png')}
                />
                <Text style={{ fontWeight: 'semibold', textAlign: 'center' }}>CODM</Text>
              </View>
              <View style={{ alignItems: 'center', marginRight: 20, width: '20%' }}>
                <Image
                  style={{ width: 30, height: 30, marginBottom: 15 }}
                  source={require('../assets/products/more.png')}
                />
                <Text style={{ fontWeight: 'semibold', textAlign: 'center' }}>Lainnya</Text>
              </View>
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
    marginBottom: 20
  },
});

export default HomeScreen