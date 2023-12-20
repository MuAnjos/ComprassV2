/* eslint-disable no-empty */
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Switch,
  TouchableOpacity,
} from 'react-native';
import { Text } from '../components/Text';
import { useFonts } from 'expo-font';
import { Entypo } from '@expo/vector-icons';
import { LanguageOption } from '../components/profileComponents/LanguageOption';
import { EditInfos } from '../components/profileComponents/EditInfos';
import { LogOutWarning } from '../components/profileComponents/Warnings';
import { AntDesign } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { useIsFocused } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

export const ProfileScreen = () => {
  const [isFontsLoaded] = useFonts({
    'OpenSans-400': require('../assets/fonts/OpenSans-Regular.ttf'),
    'OpenSans-600': require('../assets/fonts/OpenSans-SemiBold.ttf'),
    'OpenSans-700': require('../assets/fonts/OpenSans-Bold.ttf'),
    'OpenSans-800': require('../assets/fonts/OpenSans-ExtraBold.ttf'),
  });

  const [isEnabled, setIsEnabled] = useState(false);
  const [verificationIcon, setVerificationIcon] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(
    'https://soccerpointeclaire.com/wp-content/uploads/2021/06/default-profile-pic-e1513291410505.jpg',
  );
  const [userId, setUserId] = useState(null);

  const { user } = useAuth();

  function FocusAwareStatusBar() {
    const isFocused = useIsFocused();
    return isFocused ? <StatusBar style="dark" backgroundColor="#fff" /> : null;
  }

  useEffect(() => {
    if (user) {
      fetchUserProfile(user);
    }
  }, [user]);

  useEffect(() => {
    setVerificationIcon(isEnabled);
  }, [isEnabled]);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const [isLogOutWarningVisible, setIsLogOutWarningVisible] = useState(false);
  const handleCloseModal = () => {
    if (!isLogOutWarningVisible) {
      setVerificationIcon(!isEnabled);
    }
    setIsLogOutWarningVisible(false);
  };
  const handleNoPress = () => {
    setVerificationIcon(false);
  };

  const fetchUserProfile = async (accessToken: string) => {
    try {
      const response = await fetch(
        'https://api.escuelajs.co/api/v1/auth/profile',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
        setNameInput(data.name);
        setEmail(data.email);
        setUserId(data.id);
        setImage(data.avatar);
      } else {
      }
    } catch (error) {}
  };

  const updateUserProfile = async (newName: string) => {
    try {
      const url = `https://api.escuelajs.co/api/v1/users/${userId}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newName,
        }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setNameInput(updatedUser.name);
      }
    } catch (error) {}
  };

  const handleVerificationPress = () => {
    if (isEnabled) {
      setNameInput(nameInput);
      updateUserProfile(nameInput);
      setIsEnabled(false);
    }
  };

  if (!isFontsLoaded) {
    return null;
  }

  return (
    <>
      <FocusAwareStatusBar />
      <View style={styles.container}>
        {verificationIcon && (
          <TouchableOpacity
            style={styles.verification}
            onPress={handleVerificationPress}
          >
            <AntDesign name="checkcircle" size={46} color="#2AA952" />
          </TouchableOpacity>
        )}
        <View style={styles.titleImageContainer}>
          <View style={styles.containerTitle}>
            <Text style={styles.textTitle}>My profile</Text>
          </View>

          <Image
            style={styles.image}
            source={{
              uri: `${image}`,
            }}
          />
        </View>
        <View>
          {isEnabled ? (
            <EditInfos userName={nameInput} onNameChange={setNameInput} />
          ) : (
            <Text style={styles.textName}>{nameInput}</Text>
          )}
          <Text style={styles.textEmail}>
            {email || 'matildabrown@mail.com'}
          </Text>
        </View>
        <View style={styles.edits}>
          <Text style={styles.text}>Edit Informations</Text>
          <Switch
            trackColor={{ false: '#C0C0C0', true: '#FF0024' }}
            thumbColor={isEnabled ? '#9B9B9B' : '#9B9B9B'}
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={styles.buttonSwitch}
          />
        </View>
        <LanguageOption />
        <View style={styles.edits}>
          <Text style={styles.text}>Log out</Text>
          <TouchableOpacity onPress={() => setIsLogOutWarningVisible(true)}>
            <Entypo
              name="log-out"
              size={20}
              color="#9B9B9B"
              style={styles.iconLog}
            />
          </TouchableOpacity>
          {isLogOutWarningVisible && (
            <LogOutWarning
              visible={isLogOutWarningVisible}
              onCloseModal={handleCloseModal}
              onNoPress={handleNoPress}
            />
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F9F9F9',
  },
  verification: {
    position: 'absolute',
    top: 0,
    right: 16,
    marginTop: 66,
    marginRight: 5,
  },
  titleImageContainer: {
    marginTop: 105,
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitle: {
    color: '#000',
    fontSize: 32,
    fontWeight: '800',
  },
  containerTitle: {
    paddingLeft: 15,
    width: '100%',
  },
  image: {
    borderRadius: 100,
    width: 150,
    height: 150,
  },
  textName: {
    marginTop: 13.12,
    textAlign: 'center',
    color: '#000',
    fontSize: 24,
    fontWeight: '600',
  },
  textEmail: {
    fontSize: 14,
    color: '#9B9B9B',
    alignSelf: 'center',
  },
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
  buttonSwitch: {
    marginLeft: 154,
  },
  iconLog: {
    marginLeft: 265,
  },
});
