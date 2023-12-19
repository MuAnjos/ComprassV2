import React from 'react';
import { View, Modal, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';

interface LogOutWarningProps {
  visible: boolean;
  onCloseModal: () => void;
  onNoPress: () => void;
}

export const LogOutWarning: React.FC<LogOutWarningProps> = ({
  visible,
  onCloseModal,
  onNoPress,
}) => {
  const { signOut } = useAuth();

  const navigation = useNavigation();

  const handleYesPress = () => {
    signOut();
    navigation.navigate('Home');
  };

  const handleNoPress = () => {
    onNoPress();
    onCloseModal();
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.warningContainer}>
        <View style={styles.background} />
        <View style={styles.warningContent}>
          <View>
            <Text style={styles.warningTitle}>Warning</Text>
          </View>
          <Text style={styles.text}>Do you really want to leave?</Text>
          <View style={styles.buttons}>
            <TouchableOpacity onPress={handleYesPress}>
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNoPress}>
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  warningContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  warningContent: {
    width: '80%',
    backgroundColor: '#F9F9F9',
    borderRadius: 34,
    marginLeft: 16,
    marginTop: 16,
    marginBottom: 10,
    padding: 20,
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 25,
  },
  text: {
    fontSize: 14,
    fontWeight: '400',
    alignSelf: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 29,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '700',
  },
});
