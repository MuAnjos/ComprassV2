import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import CreditCardModal from '../components/checkoutComponents/CreditCardModal';
import DeliverySelection from '../components/checkoutComponents/DeliverySelection';
import { useAddress } from '../../contexts/zustand';

const CheckoutScreen = (props: any) => {
  const [shippingAddress, setShippingAddress] = useState(
    useAddress.getState().address[0] || {},
  );
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [highlightedOption, setHighlightedOption] = useState(null);
  const [isCreditCardModalVisible, setIsCreditCardModalVisible] =
    useState(false);
  const [showPixLogo, setShowPixLogo] = useState(false);
  const [showCardLogo, setShowCardLogo] = useState(false);
  const [showBoletoLogo, setShowBoletoLogo] = useState(false);
  const [cardNumber, setCardNumber] = useState(false);
  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(null);

  useEffect(() => {}, []);

  const navigation = useNavigation();

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handlePaymentMethodSelect = (method: any) => {
    setSelectedPaymentMethod(method);

    if (method === 'Pix') {
      setCardNumber(false);
      setShowPixLogo(true);
      setShowCardLogo(false);
      setShowBoletoLogo(false);
    } else if (method === 'Boleto Bancário') {
      setCardNumber(false);
      setShowPixLogo(false);
      setShowCardLogo(false);
      setShowBoletoLogo(true);
    } else if (method === 'Cartão') {
      setCardNumber(true);
      setShowPixLogo(false);
      setShowCardLogo(true);
      setShowBoletoLogo(false);
    }
  };

  const handleAddCard = (newCardNumber: any) => {
    setCardNumber(newCardNumber);
  };

  const handleOptionHighlight = (option: any) => {
    setHighlightedOption(option);
  };

  const toggleCreditCardModal = () => {
    setIsCreditCardModalVisible(!isCreditCardModalVisible);
    setIsModalVisible(false);
  };

  const handleSubmitOrder = () => {
    if (shippingAddress && selectedPaymentMethod && selectedDeliveryMethod) {
      navigation.navigate('SuccessScreen', {
        paymentMethod: selectedPaymentMethod,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.shippingTitle}>Shipping address</Text>
          <View style={styles.shippingContainer}>
            <TouchableOpacity
              style={styles.changeButton}
              onPress={() => navigation.navigate('AddressForm')}
            >
              <Text style={styles.changeButtonText}>Change</Text>
            </TouchableOpacity>
            <Text style={styles.fullName}>{shippingAddress.fullName}</Text>
            <Text style={styles.address}>{shippingAddress.address}</Text>
            <Text style={styles.address2}>
              {shippingAddress.city}, {shippingAddress.zipCode},{' '}
              {shippingAddress.state}
            </Text>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.paymentSection}>
            <Text style={styles.paymentTitle}>Payment method</Text>
            <TouchableOpacity
              style={styles.changePButton}
              onPress={toggleModal}
            >
              <Text style={styles.changeButtonText}>Change</Text>
            </TouchableOpacity>
            <View style={styles.logoMethod}>
              {showPixLogo && (
                <Image
                  source={require('../../assets/images/pix.png')}
                  style={styles.pixLogo}
                />
              )}
              {showBoletoLogo && (
                <Image
                  source={require('../../assets/images/boleto.png')}
                  style={styles.boletoLogo}
                />
              )}
              {showCardLogo && (
                <Image
                  source={require('../../assets/images/mastercard.png')}
                  style={styles.cartaoLogo}
                />
              )}
              {cardNumber && (
                <Text style={styles.cardNumber}>{cardNumber} </Text>
              )}
              <Text style={styles.paymentMethod}>
                {' '}
                {selectedPaymentMethod ? selectedPaymentMethod : 'None added'}
              </Text>
            </View>
          </View>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={toggleModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={toggleModal}
              >
                <AntDesign name="minus" size={70} color="gray" />
              </TouchableOpacity>
              <Text style={styles.modalTit}>Choose your payment method</Text>
              <View style={styles.modalOp}>
                <TouchableOpacity
                  onPress={() => {
                    handlePaymentMethodSelect('Cartão');
                    handleOptionHighlight('Cartão');
                    toggleCreditCardModal();
                  }}
                  style={[
                    styles.modalOption,
                    highlightedOption === 'Cartão' && styles.highlightedOption,
                  ]}
                >
                  <Text
                    style={
                      highlightedOption === 'Cartão' ? { color: 'white' } : {}
                    }
                  >
                    Cartão de crédito ou débito
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handlePaymentMethodSelect('Pix');
                    handleOptionHighlight('Pix');
                  }}
                  style={[
                    styles.modalOption,
                    highlightedOption === 'Pix' && styles.highlightedOption,
                  ]}
                >
                  <Text
                    style={
                      highlightedOption === 'Pix' ? { color: 'white' } : {}
                    }
                  >
                    Pix
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handlePaymentMethodSelect('Boleto Bancário');
                    handleOptionHighlight('Boleto');
                  }}
                  style={[
                    styles.modalOption,
                    highlightedOption === 'Boleto' && styles.highlightedOption,
                  ]}
                >
                  <Text
                    style={
                      highlightedOption === 'Boleto' ? { color: 'white' } : {}
                    }
                  >
                    Boleto
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <CreditCardModal
          isVisible={isCreditCardModalVisible}
          toggleModal={toggleCreditCardModal}
          ModalVisible={isModalVisible}
          onAddCard={handleAddCard}
        />

        <View style={styles.section}>
          <Text style={styles.deliveryTitle}>Delivery method</Text>
          <DeliverySelection
            setSelectedDeliveryMethod={setSelectedDeliveryMethod}
          />
        </View>
        <TouchableOpacity
          style={[
            styles.sbutton,
            shippingAddress && selectedPaymentMethod && selectedDeliveryMethod
              ? { backgroundColor: '#FF0024' }
              : {},
          ]}
          onPress={handleSubmitOrder}
        >
          <Text style={styles.sbuttonText}>SUBMIT ORDER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  fullName: {
    marginTop: 20,
    marginLeft: 24,
    color: '#000',
    fontSize: 14,
    fontWeight: '600',
  },
  address: {
    fontSize: 14,
    fontWeight: '400',
    marginLeft: 24,
    marginTop: 2,
  },
  address2: {
    fontSize: 14,
    fontWeight: '400',
    marginLeft: 24,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 0,
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
  },
  modalTit: {
    width: '100%',
    textAlign: 'center',
    height: 24,
    fontSize: 18,
    fontWeight: '700',
    marginTop: 8,
    marginBottom: 32,
  },
  modalOp: {
    marginBottom: 22,
  },
  modalOption: {
    color: '#000',
    fontSize: 16,
    padding: 15,
    fontWeight: '600',
  },
  highlightedOption: {
    backgroundColor: '#FF0024',
    fontWeight: '600',
  },
  closeButton: {
    alignSelf: 'center',
  },
  container: {
    marginTop: 30,
    marginLeft: 8,
    marginRight: 8,
    flex: 1,
    backgroundColor: '#rgba',
  },
  section: {
    padding: 10,
  },
  shippingTitle: {
    fontWeight: '700',
    fontSize: 16,
  },
  shippingContainer: {
    height: 108,
    width: '100%',
    marginTop: 16,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#FFF',
    shadowColor: '#rgba',

    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 25,
    shadowRadius: 4,
    elevation: 2,
  },

  changeButton: {
    position: 'absolute',
    top: 18,
    right: 30,
  },
  changeButtonText: {
    color: '#FF0024',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 20,
  },

  input: {
    fontSize: 14,
    height: '100%',
    marginLeft: 24,
  },
  paymentSection: {
    flexDirection: 'column',
  },
  changePButton: {
    position: 'absolute',
    top: 24,
    right: 40,
  },
  paymentTitle: {
    fontWeight: '600',
    top: 24,
    fontSize: 16,
    marginBottom: 10,
  },
  logoMethod: {
    flexDirection: 'row',
    marginTop: 40,
  },
  paymentMethod: {
    marginTop: 10,
    width: '100%',
    height: 20,
    color: '#9B9B9B',
    fontSize: 14,
    fontWeight: '400',
    marginLeft: '5%',
  },
  pixLogo: {
    width: 40,
    height: 38,
    marginLeft: 31,
  },
  boletoLogo: {
    width: 100,
    height: 38,
  },
  cartaoLogo: {
    width: 45,
    height: 35,
    marginLeft: 31,
  },
  cardNumber: {
    marginTop: 10,
    marginLeft: 32,
    marginRight: 120,
  },
  deliveryTitle: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: '500',
  },
  containerButtom: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sbutton: {
    width: '90%',
    height: 48,
    marginHorizontal: 20,
    backgroundColor: '#444',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sbuttonText: {
    color: '#FFF',
    marginHorizontal: 18,
  },
});

export default CheckoutScreen;
