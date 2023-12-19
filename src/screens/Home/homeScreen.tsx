import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  FlatList,
  Dimensions,
  RefreshControl,
} from 'react-native';
import { useFonts } from 'expo-font';
import { Text } from '../../components/Text';
import { StatusBar } from 'expo-status-bar';
import { Entypo } from '@expo/vector-icons';
import { CategoryList } from '../../components/home/CategoryList';
import { SearchButton } from '../../components/home/SearchButtom/searchButtom';
import { ActualUser } from '../../components/home/ActualUser';
import { useAuth } from '../../contexts/AuthContext';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export const HomeScreen = () => {
  const [isFontsLoaded] = useFonts({
    'OpenSans-400': require('../../assets/fonts/OpenSans-Regular.ttf'),
    'OpenSans-600': require('../../assets/fonts/OpenSans-SemiBold.ttf'),
    'OpenSans-700': require('../../assets/fonts/OpenSans-Bold.ttf'),
    'OpenSans-800': require('../../assets/fonts/OpenSans-ExtraBold.ttf'),
  });

  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [forceRerender, setForceRerender] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setForceRerender((prev) => !prev);
    }, 1000);
  };

  if (!isFontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <SearchButton />
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="red"
          />
        }
        key={forceRerender ? 'key-1' : 'key-2'}
        ListHeaderComponent={
          <View style={styles.bannercontainer}>
            <ImageBackground
              source={require('../../../assets/images/home/compass-banner.jpg')}
              style={styles.backgroundImage}
            >
              {user ? <ActualUser /> : <></>}
              <View style={styles.logo}>
                <Text style={styles.logotext}>C</Text>
                <Image
                  source={require('../../../assets/images/home/logo-compass-uol.png')}
                  style={styles.logopic}
                />
                <Text style={styles.logotext}>mprass</Text>
              </View>
              <View style={styles.slogan}>
                <Text style={styles.slogantext}>Here you always win!</Text>
                <Entypo name="shopping-cart" size={46} color="red" />
              </View>
            </ImageBackground>
          </View>
        }
        data={[1]}
        extraData={forceRerender}
        renderItem={() => (
          <View style={styles.productscontainer}>
            <CategoryList />
          </View>
        )}
        keyExtractor={(item) => item.toString()}
      />
      <StatusBar style="light" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  bannercontainer: {
    height: screenHeight * 0.5,
  },
  productscontainer: {
    flex: 1,
  },
  backgroundImage: {
    resizeMode: 'cover',
    height: '100%',
  },
  logo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logotext: {
    fontSize: screenHeight * 0.05,
    color: 'white',
  },
  logopic: {
    width: screenWidth * 0.08,
    height: screenWidth * 0.08,
  },
  slogan: {
    color: 'white',
    marginLeft: screenWidth * 0.03,
    marginBottom: screenHeight * 0.02,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  slogantext: {
    color: 'white',
    fontSize: screenHeight * 0.03,
    marginRight: screenWidth * 0.03,
  },
});
