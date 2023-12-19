import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { Colors } from '../../../assets/styles/Colors';
import { EmptyCartIcon } from '../../../assets/images/svg/EmptyCartIcon';

export const EmptyCard = () => {
  return (
    <View style={styles.container}>
      <EmptyCartIcon />
      <Text style={styles.text}>Your cart is so empty and abandoned...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 150,
    marginVertical: 56,
  },
  text: {
    color: Colors.black,
    paddingTop: 10,
    fontSize: 24,
    lineHeight: 36,
    textAlign: 'center',
  },
  img: {
    marginVertical: 16,
  },
});
