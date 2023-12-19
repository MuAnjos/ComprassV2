import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const CreditCardModal = ({ isVisible, toggleModal, onAddCard }: any) => {
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expireDate, setExpireDate] = useState('');
  const [cvv, setCVV] = useState('');
  const [error, setError] = useState('');
  const [cardLogo, setCardLogo] = useState(null);

  const handleNameChange = (text: string) => {
    setName(text);
  };

  const handleCardNumberChange = (text: string) => {
    setCardNumber(text);
  };

  const handleExpireDateChange = (text: string) => {
    setExpireDate(text);
  };

  const handleCVVChange = (text: string) => {
    setCVV(text);
  };

  useEffect(() => {
    if (cardNumber.length === 8) {
      const cardIssuer = determineCardIssuer(cardNumber);
      setCardLogo(cardIssuer);
    } else {
      setCardLogo(null);
    }
  }, [cardNumber]);

  const determineCardIssuer = (cardNumber: any) => {
    if (
      name !== '' &&
      cardNumber.length === 8 &&
      expireDate.length >= 5 &&
      cvv.length === 3
    ) {
      return require('../../../assets/images/mastercard.png');
    }
    return null;
  };

  const renderLabel = (labelText: string) => (
    <Text style={styles.label}>{labelText}</Text>
  );

  const isFormValid = () => {
    return (
      name !== '' &&
      cardNumber.length === 8 &&
      expireDate.length >= 5 &&
      cvv.length === 3
    );
  };

  const handleAddCard = () => {
    if (isFormValid()) {
      onAddCard(cardNumber);
      toggleModal();
    } else {
      setError('Please fill in all fields correctly.');
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={toggleModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
            <AntDesign name="minus" size={70} color="gray" />
          </TouchableOpacity>
          <Text style={styles.modalTit}>Add new Card</Text>
          {error && <Text style={styles.errorMessage}>{error}</Text>}
          <View style={styles.inputBox}>
            {name ? renderLabel('Name on card') : null}
            <TextInput
              style={styles.input}
              value={name}
              placeholder="Name on card"
              onChangeText={handleNameChange}
            />
            {cardLogo && <Image source={cardLogo} style={styles.cardLogo} />}
          </View>
          <View style={styles.inputBox}>
            <View style={styles.cardnumberInput}>
              {cardNumber ? renderLabel('Card number') : null}
              <TextInput
                style={styles.input}
                value={cardNumber}
                placeholder="Card number"
                onChangeText={handleCardNumberChange}
              />
            </View>
          </View>
          <View style={styles.inputBox}>
            {expireDate ? renderLabel('Expire Date') : null}
            <TextInput
              style={styles.input}
              value={expireDate}
              placeholder="Expire Date"
              onChangeText={handleExpireDateChange}
            />
          </View>
          <View style={styles.inputBox}>
            {cvv ? renderLabel('CVV') : null}
            <TextInput
              style={styles.input}
              value={cvv}
              placeholder="CVV"
              onChangeText={handleCVVChange}
            />
          </View>
          <TouchableOpacity
            style={[
              styles.addCardButton,
              { backgroundColor: isFormValid() ? '#FF0024' : '#444' },
            ]}
            onPress={handleAddCard}
          >
            <Text style={styles.buttonText}>ADD CARD</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 392,
    height: 576,
    backgroundColor: 'white',
    paddingTop: 1,
    padding: 14,
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
  },
  modalTit: {
    width: 272,
    height: 24,
    fontSize: 18,
    fontWeight: '800',
    marginLeft: 126,
    marginBottom: 32,
  },
  closeButton: {
    alignSelf: 'center',
    marginBottom: 1,
  },
  inputBox: {
    width: 343,
    height: 64,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 12,
    marginBottom: 16,
    marginLeft: 8,
    position: 'relative',
  },
  input: {
    marginTop: 24,
    fontSize: 14,
    fontWeight: '400',
    borderColor: 'lightgray',
    marginBottom: 16,
    marginLeft: 16,
  },
  label: {
    position: 'absolute',
    marginTop: 10,
    left: 16,
    fontSize: 12,
    color: 'gray',
    marginBottom: 3,
  },
  cardnumberInput: {
    flexDirection: 'column',
  },
  cardLogo: {
    alignSelf: 'flex-end',
    marginTop: 35,
    marginRight: 20,
  },
  addCardButton: {
    marginTop: 32,
    width: 343,
    height: 48,
    marginLeft: 8,
    marginRight: 8,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '800',
  },
  errorMessage: {
    fontSize: 12,
    color: '#ff0000',
    marginBottom: 8,
    alignSelf: 'center',
  },
});

export default CreditCardModal;
