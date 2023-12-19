import React from 'react';
import { AddressForm } from '../auth/AddressForm';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../../assets/styles/Colors';

export const AdressScreen = () => {
  return (
    <View style={styles.container}>
      <AddressForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
