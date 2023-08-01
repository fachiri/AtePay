import * as React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SecurityScreen = () => {
  const [isPressed, setIsPressed] = React.useState(0)
  const [user, setuser] = React.useState({})

  React.useEffect(() => {
    getData()
  }, []);
  
  const getData = async () => {
    const dataUser = await AsyncStorage.getItem('user');
    setuser(JSON.parse(dataUser))
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
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <FontAwesome5 name={'unlock-alt'} size={20} color='#48C239'/>
                  <Text style={{ fontSize: 15, marginLeft: 10 }}>Ganti PIN</Text>
                </View>
                <FontAwesome5 name={'chevron-right'} size={20} color='#48C239'/>
              </Pressable>
              <Pressable 
                onPressIn={() => { setIsPressed(2) }}
                onPressOut={() => { setIsPressed(0) }}
                style={[
                  styles.pressable,
                  isPressed == 2 && styles.pressableActive,
                ]}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <FontAwesome5 name={'key'} size={20} color='#48C239'/>
                  <Text style={{ fontSize: 15, marginLeft: 10 }}>Ganti Password</Text>
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
    paddingVertical: 20,
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

export default SecurityScreen