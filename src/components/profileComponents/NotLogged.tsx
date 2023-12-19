import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, StatusBar } from 'react-native';
import { LanguageOption } from './LanguageOption';
import { useNavigation } from '@react-navigation/native';

export const NotLogged = () => {

  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#F9F9F9'} barStyle={'dark-content'}/>
      <View style={styles.titleContainer}>
        <Text style={styles.textTitle}>My profile</Text>
      </View>
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>
          You need to log in to see your details
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.textButton}>LOGIN</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.language}>
        <LanguageOption />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F9F9F9'
  },
  titleContainer: {
    marginTop: 107,
    marginLeft: 16,
    marginRight: 190,
    flexDirection: 'column',
  },
  textTitle: {
    color: '#000',
    fontSize: 32,
    fontWeight: '800',
  },
  subtitleContainer: {
    marginTop: 83,
    marginLeft: 45,
    marginRight: 45,
    marginBottom: 96,
    alignItems: 'center',
  },
  subtitle: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  button: {
    width: 136,
    height: 48,
    marginTop: 16,
    borderRadius: 25,
    backgroundColor: '#FF0024',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    color: '#FFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  language: {},
});
