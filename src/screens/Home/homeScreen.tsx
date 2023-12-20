import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  FlatList,
  Dimensions,
  RefreshControl,
} from 'react-native';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { Text } from '../../components/Text';
import { CategoryList } from '../../components/home/CategoryList';
import { SearchButton } from '../../components/home/SearchButtom/searchButtom';
import { ActualUser } from '../../components/home/ActualUser';
import { useAuth } from '../../contexts/AuthContext';
import { FirstPartLogo } from '../../components/Icons/FirstPartLogo';
import { LogoUol } from '../../components/Icons/LogoUol';
import { Logo } from '../Login/styles';
import { SecondPartLogo } from '../../components/Icons/SecondPartLogo';
import { ShoppingCart } from '../../components/Icons/ShoppingCart';
import { useIsFocused } from '@react-navigation/native';

const screenHeight = Dimensions.get('window').height;

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

  function FocusAwareStatusBar() {
    return useIsFocused() && <StatusBar style="light" backgroundColor="#000" />;
  }

  if (!isFontsLoaded) {
    return null;
  }

  return (
    <>
      <FocusAwareStatusBar />
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
                source={require('../../../assets/images/home/compass-banner.png')}
                style={styles.backgroundImage}
              >
                {user && <ActualUser />}
                <Logo style={{ marginTop: screenHeight * 0.19 }}>
                  <FirstPartLogo />
                  <View style={{ marginLeft: 4.7, marginRight: 5.91 }}>
                    <LogoUol />
                  </View>
                  <View style={{ marginBottom: -8.52 }}>
                    <SecondPartLogo />
                  </View>
                </Logo>
                <View style={styles.slogan}>
                  <Text
                    style={{ marginBottom: 0, marginRight: 16, color: '#fff' }}
                  >
                    Here you always win!
                  </Text>
                  <ShoppingCart />
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
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  bannercontainer: {
    paddingTop: 50,
    backgroundColor: '#000',
    height: screenHeight * 0.5,
  },
  productscontainer: {
    flex: 1,
  },
  backgroundImage: {
    resizeMode: 'cover',
    height: '100%',
  },
  slogan: {
    marginLeft: 16,
    marginTop: 70,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
