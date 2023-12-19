import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SuccessQRcodeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/qrcode.jpg')}
        style={styles.image}
      />
      <Text style={styles.tit}>Success!</Text>
      <Text style={styles.text}>
        Pay your pix using the QR code above and then follow the steps sent by
        email.
      </Text>
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => navigation.navigate('TabNavigatorHome')}
      >
        <Text style={styles.continue}>CONTINUE SHOPPING</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    marginTop: 209,
    width: 225,
    height: 225,
    resizeMode: 'contain',
  },
  tit: {
    color: '#000',
    fontSize: 32,
    fontWeight: '700',
    marginTop: 20,
    width: 132,
    height: 44,
  },
  text: {
    color: '#000',
    marginTop: 16,
    textAlign: 'center',
    width: 284,
    height: 42,
    fontSize: 14,
    fontWeight: '400',
  },
  continueButton: {
    backgroundColor: '#FF0024',
    marginTop: 174,
    width: 343,
    height: 48,
    borderRadius: 24,
  },
  continue: {
    color: '#FFF',
    marginTop: 14,
    marginLeft: 100,
    fontSize: 14,
    textAlign: 'center',
    width: 154,
    height: 20,
    fontWeight: '800',
  },
});

export default SuccessQRcodeScreen;
