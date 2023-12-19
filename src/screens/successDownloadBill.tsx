import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SuccessDownloadBill = () => {
  const navigation = useNavigation();
  const handleDownloadBoleto = () => {
    const downloadLink = 'http://exemplo.com/boleto.pdf';

    Linking.openURL(downloadLink);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/bags.jpg')}
        style={styles.image}
      />
      <Text style={styles.tit}>Success!</Text>
      <Text style={styles.text}>
        Pay the invoice by 02/10/2023 and then follow the steps sent by email.
      </Text>
      <TouchableOpacity
        style={styles.baixarBoletoButton}
        onPress={handleDownloadBoleto}
      >
        <Text style={styles.baixarBoleto}>BAIXAR BOLETO</Text>
      </TouchableOpacity>
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
    backgroundColor: '#FFF',
  },
  image: {
    marginTop: 209,
    width: 208,
    height: 213,
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
  baixarBoletoButton: {
    backgroundColor: '#FF0024',
    marginTop: 110,
    width: 343,
    height: 48,
    borderRadius: 24,
  },
  baixarBoleto: {
    color: '#FFF',
    marginTop: 14,
    marginLeft: 100,
    fontSize: 14,
    textAlign: 'center',
    width: 154,
    height: 20,
    fontWeight: '800',
  },
  continueButton: {
    backgroundColor: '#FF0024',
    marginTop: 16,
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

export default SuccessDownloadBill;
