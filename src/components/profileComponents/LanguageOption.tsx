import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { ModalLanguages } from './ModalLanguages';

export const LanguageOption = () => {
  const [isIconUp, setIsIconUp] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleIconPress = () => {
    setIsIconUp((prevState) => !prevState);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.edits}>
      <Text style={styles.text}>Language</Text>
      <TouchableOpacity onPress={handleIconPress}>
        <Entypo
          name={isIconUp ? 'chevron-up' : 'chevron-down'}
          size={24}
          color="#9B9B9B"
          style={styles.iconLanguage}
        />
        <ModalLanguages visible={isModalVisible} onClose={closeModal} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  edits: {
    paddingVertical: 23,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#B6B6B6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: '#000',
    fontWeight: '700',
  },
  iconLanguage: {
    marginLeft: 246,
  },
});
