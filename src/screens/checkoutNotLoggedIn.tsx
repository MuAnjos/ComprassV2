import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CheckoutNotLoggedin = () => {
  const navigation = useNavigation<any>();

  const handleLogin = async () => {
    navigation.navigate('LoginScreen');
  };
  return (
    <View>
      <Text style={styles.title}>
        You need to connect to complete your purchase, come on?
      </Text>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 346,
    fontSize: 16,
    fontWeight: '600',
    width: '100%',
    height: 44,
    textAlign: 'center',
  },
  button: {
    marginHorizontal: 18,
    marginTop: 16,
    alignSelf: 'center',
    alignItems: 'center',
    width: '80%',
    height: 48,
    backgroundColor: '#FF0024',
    borderRadius: 24,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFF',
  },
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default CheckoutNotLoggedin;
