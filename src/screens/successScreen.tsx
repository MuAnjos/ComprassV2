import React from 'react';
import { StyleSheet, View, ImageBackground, Text, TouchableOpacity } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

type RootStackParamList = {
  SuccessQRCodeScreen: undefined;
  SuccessScreen: { paymentMethod: string };
};

type SuccessScreenRouteProp = RouteProp<RootStackParamList, 'SuccessScreen'>;

const SuccessScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<SuccessScreenRouteProp>();
  const { paymentMethod } = route.params;

  const handleContinue = () => {
    if (paymentMethod === 'Pix') {
      navigation.navigate('SuccessQRcodeScreen');
    } else if (paymentMethod === 'Boleto Bancário') {
      navigation.navigate('SuccessDownloadBill');
    } else if (paymentMethod === 'Cartão') {
      navigation.navigate('SuccessScreen2');
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/image.jpg")}
      style={styles.container}
    >
      <View style={styles.overlay}>
        <Text style={styles.tit}>Success!</Text>
        <Text style={styles.text}>Your order will be delivered soon. Thank you for choosing our app!</Text>
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continue}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    alignItems: 'center',
  },

  tit: {
    marginTop: 115,
    color: '#000',
    fontSize: 32,
    fontWeight: '700',
  },
  text: {
    width: 251,
    height: 48,
    marginTop: 12,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '400',
  },

  continueButton: {
    marginTop: 24,
    width: 160,
    height: 36,
    backgroundColor: '#FF0024',
    borderRadius: 24,
  },
  continue: {
    marginTop: 8,
    textAlign: 'center',
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default SuccessScreen;
