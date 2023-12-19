import { ImageBackground, Dimensions, View, StyleSheet, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';
import { Container, Logo} from './styles';
import { FirstPartLogo } from '../../components/Icons/FirstPartLogo';
import { LogoUol } from '../../components/Icons/LogoUol';
import { SecondPartLogo } from '../../components/Icons/SecondPartLogo';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../../contexts/AuthContext';

export function SplashScreen() {
  const [isFontsLoaded] = useFonts({
    'OpenSans-400': require('../../assets/fonts/OpenSans-Regular.ttf'),
    'OpenSans-600': require('../../assets/fonts/OpenSans-SemiBold.ttf'),
    'OpenSans-700': require('../../assets/fonts/OpenSans-Bold.ttf'),
    'OpenSans-800': require('../../assets/fonts/OpenSans-ExtraBold.ttf'),
  });

  const { user, signIn } = useAuth();

  if (!isFontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="light" backgroundColor="#111213" />
      <Container>
        <ImageBackground
          source={require('../../assets/img/CompassBackgroundLogo.png')}
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          resizeMode="contain"
        >
          <Logo>
            <FirstPartLogo />
            <View style={{ marginLeft: 4.9, marginRight: 5.91 }}>
              <LogoUol />
            </View>
            <View style={{ marginBottom: -8.52 }}>
              <SecondPartLogo />
            </View>
          </Logo>

          <ActivityIndicator size={80} animating={true} color="#FF0024" />

        </ImageBackground>
      </Container>
    </>
  );
}
