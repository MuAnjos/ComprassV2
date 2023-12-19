import React, { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../../assets/styles/Colors';

interface PriceProps {
  children: ReactNode;
}
export const TotalAmount = ({ children }: PriceProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.totalAmount}>Total amount:</Text>
      <Text style={styles.price}>{children} R$</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 18,
  },
  totalAmount: {
    fontSize: 14,
    color: Colors.gray_500,
  },
  price: {
    fontWeight: '600',
    fontSize: 18,
    justifyContent: 'flex-end',
    marginLeft: 16,
  },
});
