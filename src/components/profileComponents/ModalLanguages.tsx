import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';

interface ModalLanguagesProps {
  visible: boolean;
  onClose: () => void;
}

export const ModalLanguages: React.FC<ModalLanguagesProps> = ({
  visible,
  onClose,
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isEnglishSelected, setIsEnglishSelected] = useState(true);

  const onEnglishButtonClick = () => {
    setSelectedLanguage('english');
    setIsEnglishSelected(true);
  };

  const onPortugueseButtonClick = () => {
    setSelectedLanguage('portuguese');
    setIsEnglishSelected(false);
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.modalContainer}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContent}>
          <View style={styles.modalTitleContainer}>
            <Entypo name="minus" size={50} color="#9B9B9B" />
            <Text style={styles.modalTitle}>Languages</Text>
          </View>
          <TouchableOpacity
            style={[
              styles.modalButtonEnglish,
              {
                backgroundColor:
                  selectedLanguage === 'english' ? '#DB3022' : '#F9F9F9',
              },
            ]}
            onPress={onEnglishButtonClick}
          >
            <Text
              style={[
                styles.buttonText,
                { color: selectedLanguage === 'english' ? '#FFF' : '#000' },
              ]}
            >
              English
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.modalButton,
              {
                backgroundColor:
                  selectedLanguage === 'portuguese' ? '#DB3022' : '#F9F9F9',
              },
            ]}
            onPress={onPortugueseButtonClick}
          >
            <Text
              style={[
                styles.buttonTextPortuguese,
                { color: selectedLanguage === 'portuguese' ? '#FFF' : '#000' },
              ]}
            >
              Portuguese-Brazil
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#F9F9F9',
    paddingTop: 5,
    paddingBottom: 20,
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
  },
  modalTitleContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: 32,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  modalButtonEnglish: {
    width: '100%',
    height: 48,
    backgroundColor: '#DB3022',
  },
  modalButton: {
    width: '100%',
    height: 48,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 16,
    marginTop: 13,
  },
  buttonTextPortuguese: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 16,
    marginTop: 13,
  },
});
