import styled from 'styled-components/native';
import {Platform, StatusBar} from 'react-native';

const isAndroid = Platform.OS === 'android';

export const Container = styled.View`
  margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : '0'};
  background-color: #111213;
  flex: 1;
`;

export const Logo = styled.SafeAreaView`
  margin-top: 66px;
  margin-bottom: 40px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const ButtonsContainer = styled.SafeAreaView`
  margin: 64px 0 15px 0;
`;

export const OtherOptions = styled.SafeAreaView`
  justify-content: center;
  align-items: center;
`;
